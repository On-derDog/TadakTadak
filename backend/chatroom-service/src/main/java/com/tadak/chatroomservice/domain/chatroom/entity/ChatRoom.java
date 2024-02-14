package com.tadak.chatroomservice.domain.chatroom.entity;

import com.tadak.chatroomservice.domain.chatmember.entity.ChatMember;
import com.tadak.chatroomservice.domain.chatroom.dto.request.CreateChatroomRequest;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@SuperBuilder
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class ChatRoom {

    private static Integer DEFAULT_PARTICIPATION = 1;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String roomName;
    private String description;
    private String owner;
    private String category;
    private Integer participation;
    private Integer capacity;

    @OneToMany(mappedBy = "chatRoom", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<ChatMember> chatMembers = new ArrayList<>();

    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime modifiedAt;


    public static ChatRoom toEntity(CreateChatroomRequest chatroomRequest){
        return ChatRoom.builder()
                .roomName(chatroomRequest.getRoomName())
                .description(chatroomRequest.getDescription())
                .owner(chatroomRequest.getOwner())
                .category(chatroomRequest.getCategory())
                .participation(DEFAULT_PARTICIPATION)
                .capacity(chatroomRequest.getCapacity())
                .build();
    }

    public void increaseParticipation() {
        this.participation++;
    }

    public void decreaseParticipation() {
        this.participation--;
    }
}
