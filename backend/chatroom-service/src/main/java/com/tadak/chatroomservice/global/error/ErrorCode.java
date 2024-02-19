package com.tadak.chatroomservice.global.error;

import lombok.Getter;

@Getter
public enum ErrorCode {

    BAD_REQUEST_ERROR(400, "G001", "Bad Request Exception"),
    REQUEST_BODY_MISSING_ERROR(400, "G002", "Required request body is missing"),
    MISSING_REQUEST_PARAMETER_ERROR(400, "G004", "Missing Servlet RequestParameter Exception"),
    NOT_FOUND_ERROR(404, "G009", "Not Found Exception"),
    NULL_POINT_ERROR(404, "G010", "Null Point Exception"),
    NOT_VALID_ERROR(404, "G011", "handle Validation Exception"),
    INTERNAL_SERVER_ERROR(500, "G999", "Internal Server Error Exception"),

    /**
     * 1300 ~ 1399 (ChatRoom error)
     */
    NOT_FOUND_CHATROOM_ERROR(1300, "G1300", "현재 존재하지 않는 채팅 방 입니다."),
    NOT_OWNER_ERROR(1301, "G1300", "방장 권한이 없습니다."),
    KICKED_MEMBER_ERROR(1302, "G1300", "현재 강퇴당한 채팅 방 입니다."),
    CANNOT_TRANSFER_OWNER_ERROR(1303, "G1300", "해당 유저는 강퇴당한 유저이기 떄문에 방장 위임을 할 수 없습니다."),
    OVER_CHATROOM_PARTICIPATION_ERROR(1304, "G1300", "해당 채팅 방은 인원이 가득차 있습니다."),

    /**
     * 1400 ~ 1499
     */
    INVALID_INPUT_VALUE(1400, "G1400", "잘못된 입력 값 입니다."),

    /**
     * 1500 ~ 1599 (ChatMember error)
     */
    NOT_FOUND_CHAT_MEMBER_ERROR(1500, "G1500", "현재 채팅방에 해당 member가 존재하지 않습니다.");

    private final int status;
    private final String code;
    private final String message;

    ErrorCode(final int status, final String code, final String message) {
        this.status = status;
        this.code = code;
        this.message = message;
    }
}
