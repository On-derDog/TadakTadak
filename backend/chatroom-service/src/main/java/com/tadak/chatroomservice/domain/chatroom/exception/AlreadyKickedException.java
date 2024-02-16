package com.tadak.chatroomservice.domain.chatroom.exception;

import com.tadak.chatroomservice.global.error.ErrorCode;
import com.tadak.chatroomservice.global.error.common.BusinessException;

public class AlreadyKickedException extends BusinessException {

    public AlreadyKickedException(ErrorCode errorCode) {
        super(errorCode);
    }
}
