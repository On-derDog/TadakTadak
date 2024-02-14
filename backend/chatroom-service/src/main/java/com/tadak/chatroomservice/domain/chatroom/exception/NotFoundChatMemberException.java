package com.tadak.chatroomservice.domain.chatroom.exception;

import com.tadak.chatroomservice.global.error.ErrorCode;
import com.tadak.chatroomservice.global.error.common.BusinessException;

public class NotFoundChatMemberException extends BusinessException {
    public NotFoundChatMemberException(ErrorCode errorCode) {
        super(errorCode);
    }
}
