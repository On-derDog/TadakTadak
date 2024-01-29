package com.tadak.userservice.domain.member.exception;

import com.tadak.userservice.global.error.ErrorCode;
import com.tadak.userservice.global.error.common.BusinessException;

public class NotMatchPasswordException extends BusinessException {

    public NotMatchPasswordException(ErrorCode errorCode) {
        super(errorCode);
    }
}
