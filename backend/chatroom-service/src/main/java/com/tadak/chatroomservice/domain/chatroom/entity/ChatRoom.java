package com.tadak.chatroomservice.domain.chatroom.entity;

import com.tadak.chatroomservice.domain.chatmember.entity.ChatMember;
import com.tadak.chatroomservice.domain.chatroom.dto.request.CreateChatroomRequest;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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

    private static Integer DEFAULT_PARTICIPATION = 0;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    @Size(max = 30, message = "방 제목은 30자를 초과할 수 없습니다.")
    private String roomName;
    @NotNull
    @Size(max = 255, message = "방 설명은 255자를 넘길 수 없습니다.")
    private String description;
    @NotNull
    private String owner;
    @NotNull
    @Size(max = 10, message = "카테고리 글자는 10자를 넘길 수 없습니다.")
    private String category;
    @NotNull
    private Integer participation;
    @NotNull
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

    public void updateOwner(String username) {
        this.owner = username;
    }
}
