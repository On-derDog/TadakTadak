package com.example.chattingservice.domain.chat.exception;

import com.example.chattingservice.global.error.ErrorCode;
import com.example.chattingservice.global.error.common.BusinessException;

public class NotSaveChatException extends BusinessException {
    public NotSaveChatException(ErrorCode errorCode) {
        super(errorCode);
    }
}
