package com.tadak.userservice.domain.member.exception;

import com.tadak.userservice.global.error.ErrorCode;
import com.tadak.userservice.global.error.common.BusinessException;

public class DuplicateMemberEmailException extends BusinessException {

    public DuplicateMemberEmailException(ErrorCode errorCode) {
        super(errorCode);
    }
}

