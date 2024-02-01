package com.tadak.userservice.domain.member.exception;

import com.tadak.userservice.global.error.ErrorCode;
import com.tadak.userservice.global.error.common.BusinessException;

public class NotMatchLogoutException extends BusinessException {

    public NotMatchLogoutException(ErrorCode errorCode) {
        super(errorCode);
    }
}
