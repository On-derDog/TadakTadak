package com.tadak.chatroomservice.domain.chatroom.exception;

import com.tadak.chatroomservice.global.error.ErrorCode;
import com.tadak.chatroomservice.global.error.common.BusinessException;

public class NotRoomOwnerException extends BusinessException {

    public NotRoomOwnerException(ErrorCode errorCode) {
        super(errorCode);
    }
}
