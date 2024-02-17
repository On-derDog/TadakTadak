package com.tadak.chatroomservice.domain.chatroom.exception;

import com.tadak.chatroomservice.global.error.ErrorCode;
import com.tadak.chatroomservice.global.error.common.BusinessException;

public class OverParticipationException extends BusinessException {

    public OverParticipationException(ErrorCode errorCode) {
        super(errorCode);
    }
}
