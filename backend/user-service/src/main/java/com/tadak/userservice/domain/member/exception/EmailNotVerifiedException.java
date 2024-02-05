package com.tadak.userservice.domain.member.exception;

import com.tadak.userservice.global.error.ErrorCode;
import com.tadak.userservice.global.error.common.BusinessException;

public class EmailNotVerifiedException extends BusinessException {
    public EmailNotVerifiedException(ErrorCode errorCode) {
        super(errorCode);
    }
}
