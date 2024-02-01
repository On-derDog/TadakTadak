package com.example.chattingservice.domain.chat.exception.validation;

import com.example.chattingservice.domain.chat.entity.Chat;
import com.example.chattingservice.domain.chat.exception.NotFoundChatListException;
import com.example.chattingservice.domain.chat.exception.NotSaveChatException;
import com.example.chattingservice.global.error.ErrorCode;
import java.util.List;

public class Validation {

    public static void isExistChatList(List<Chat> chatList) {
        if (chatList == null) {
            throw new NotFoundChatListException(ErrorCode.NOT_FOUND_CHAT_LIST);
        }
    }

    public static void isSuccessSaveChat(Chat savedEntity) throws NotSaveChatException {
        if (savedEntity == null) {
            throw new NotSaveChatException(ErrorCode.FAIL_TO_SAVE_CHAT);
        }
    }
}
