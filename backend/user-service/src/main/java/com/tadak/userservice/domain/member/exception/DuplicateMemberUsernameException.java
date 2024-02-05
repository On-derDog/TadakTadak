package com.tadak.userservice.domain.member.exception;

import com.tadak.userservice.global.error.ErrorCode;
import com.tadak.userservice.global.error.common.BusinessException;

public class DuplicateMemberUsernameException extends BusinessException {

    public DuplicateMemberUsernameException(ErrorCode errorCode) {
        super(errorCode);
    }
}
