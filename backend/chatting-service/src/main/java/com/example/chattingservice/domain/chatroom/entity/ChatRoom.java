package com.example.chattingservice.domain.chatroom.entity;

import com.example.chattingservice.domain.chatroom.dto.request.CreateChatRoomRequest;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "chatting_room")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class ChatRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chatroom_id")
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false, unique = true)
    private Long hostId;

    @Column
    private Long participantsCount;

    @Column(nullable = false)
    private Long participantsLimit;

    @Column(nullable = false)
    private String category;

    @Enumerated(EnumType.STRING)
    private Status status;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime modifiedAt;

    public static ChatRoom toEntity(CreateChatRoomRequest request, Long memberId) {
        Long DEFAULT_PARTICIPANTS_COUNT = 1L;
        Status DEFAULT_STATUS = Status.DEACTIVE;

        return ChatRoom.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .hostId(memberId)
                .participantsLimit(request.getParticipantsLimit())
                .category(request.getCategory())
                .participantsCount(DEFAULT_PARTICIPANTS_COUNT)
                .status(DEFAULT_STATUS)
                .build();
    }
}