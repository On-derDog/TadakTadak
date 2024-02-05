package com.tadak.userservice.domain.member.exception;

import com.tadak.userservice.global.error.ErrorCode;
import com.tadak.userservice.global.error.common.BusinessException;

public class MemberStateException extends BusinessException {

    public MemberStateException(ErrorCode errorCode) {
        super(errorCode);
    }
}