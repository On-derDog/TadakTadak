package com.tadak.userservice.global.jwt.exception;

import com.tadak.userservice.global.error.ErrorCode;
import com.tadak.userservice.global.error.common.BusinessException;

public class NotFoundTokenException extends BusinessException {

    public NotFoundTokenException(ErrorCode errorCode) {
        super(errorCode);
    }
}
