package com.tadak.chatroomservice.domain.chatroom.exception;

import com.tadak.chatroomservice.global.error.ErrorCode;
import com.tadak.chatroomservice.global.error.common.BusinessException;

public class CannotTransferOwnershipException extends BusinessException {
    public CannotTransferOwnershipException(ErrorCode errorCode) {
        super(errorCode);
    }
}
