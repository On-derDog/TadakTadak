package com.tadak.chatroomservice.domain.chatmember.entity;

import com.tadak.chatroomservice.domain.chatroom.entity.ChatRoom;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import static com.tadak.chatroomservice.domain.chatmember.entity.ChatMemberType.*;
import static jakarta.persistence.EnumType.STRING;
import static jakarta.persistence.FetchType.LAZY;
import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
@Entity
@SuperBuilder
@EntityListeners(AuditingEntityListener.class)
public class ChatMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = LAZY, cascade = CascadeType.REMOVE)
    private ChatRoom chatRoom;

    private String username;

    @Builder.Default
    @Enumerated(STRING)
    private ChatMemberType type = IN_ROOM;
}
