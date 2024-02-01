package com.example.chattingservice.domain.chat.exception;

import com.example.chattingservice.global.error.ErrorCode;
import com.example.chattingservice.global.error.common.BusinessException;

public class NotFoundChatListException extends BusinessException {
    public NotFoundChatListException(ErrorCode errorCode) {
        super(errorCode);
    }
}
