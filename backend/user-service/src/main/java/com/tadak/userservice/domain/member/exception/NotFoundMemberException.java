package com.tadak.userservice.domain.member.exception;

import com.tadak.userservice.global.error.ErrorCode;
import com.tadak.userservice.global.error.common.BusinessException;

public class NotFoundMemberException extends BusinessException {

    public NotFoundMemberException(ErrorCode errorCode) {
        super(errorCode);
    }
}