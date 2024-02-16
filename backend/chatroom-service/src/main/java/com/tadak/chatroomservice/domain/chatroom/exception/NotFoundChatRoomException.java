package com.tadak.chatroomservice.domain.chatroom.exception;

import com.tadak.chatroomservice.global.error.ErrorCode;
import com.tadak.chatroomservice.global.error.common.BusinessException;

public class NotFoundChatRoomException extends BusinessException {

    public NotFoundChatRoomException(ErrorCode errorCode) {
        super(errorCode);
    }
}
