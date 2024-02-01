package com.example.chattingservice.global.error;

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
     * Token Error 1000 ~ 1099
     */
    NOT_FOUND_TOKEN_ERROR(1000, "G1000", "현재 유효한 Token 권한 정보가 존재하지 않습니다."),
    NOT_VALID_ACCESS_TOKEN_ERROR(1001, "G1000", "만료된 Token 값 입니다."),
    NOT_VALID_REFRESH_TOKEN_ERROR(1002, "G1000", "현재 최신 refreshToken을 소지하고 있지 않습니다."),

    /**
     * Member Error 1100 ~ 1199
     */
    NOT_FOUND_MEMBER_ERROR(1100, "G1100", "현재 해당 member가 존재하지 않습니다."),

    /**
     * login error 1200 ~ 1299
     */
    NOT_MATCH_LOGIN_ERROR(1200, "G1200", "로그인 정보가 일치하지 않습니다."),

    /**
     * Binding Error 1400 ~ 1499
     */
    INVALID_INPUT_VALUE(1400, "G1400", "잘못된 입력 값 입니다."),

    /**
     * Chatting Error 2000 ~ 2099
     */

    FAIL_TO_SAVE_CHAT(2000, "G2000", "채팅 정보를 저장하는데 실패하였습니다."),
    NOT_FOUND_CHAT_LIST(2001, "G2001", "채팅 메시지를 불러오는데 실패했습니다.");

    private final int status;
    private final String code;
    private final String message;

    ErrorCode(final int status, final String code, final String message) {
        this.status = status;
        this.code = code;
        this.message = message;
    }
}
