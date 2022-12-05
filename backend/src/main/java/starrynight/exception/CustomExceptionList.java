package starrynight.exception;

import lombok.Getter;
import lombok.ToString;
import org.springframework.http.HttpStatus;

@Getter
@ToString
public enum CustomExceptionList {
    /**
     * 100~199 : Member 관련 예외처리
     * 200~299 : Game 관련 예외처리
     * 300~399 : MyRoom 관련 예외처리
     * 900~999 : 기타 예외처리
     */

    //100~199 : Member 관련 예외처리
    MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "E100", "존재하지 않는 회원입니다."),
    REFRESH_TOKEN_ERROR(HttpStatus.UNAUTHORIZED, "E101", "리프레쉬 토큰 에러입니다."),
    ACCESS_TOKEN_ERROR(HttpStatus.UNAUTHORIZED, "E102", "액세스 토큰이 유효하지 않습니다."),
    //SIGNATURE_INVALID(HttpStatus.UNAUTHORIZED, "E005", "서명이 유효하지 않습니다."),
    //TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "E301", "해당 토큰은 만료되었습니다."),
    //ADDRESS_NOT_MATCH(HttpStatus.UNAUTHORIZED, "E302", "해당 주소는 접근 권한이 없습니다."),

    //200~299 : Game 관련 예외처리
    STORY_NOT_FOUND(HttpStatus.NOT_FOUND, "E200", "스토리가 존재하지 않습니다."),
    //300~399 : MyRoom 관련 예외처리
    ROOM_NOT_FOUND(HttpStatus.NOT_FOUND,"E300","회원의 다락방이 존재하지 않습니다."),
    FURNITURE_NOT_FOUND(HttpStatus.NOT_FOUND,"E301","가구가 존재하지 않습니다."),
    CATEGORY_NOT_FOUND(HttpStatus.NOT_FOUND,"E302","카테고리가 존재하지 않습니다."),

    //900~999 : 기타 예외처리
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "E998", "서버 오류 입니다."),
    RUNTIME_EXCEPTION(HttpStatus.BAD_REQUEST, "E999", "서비스에 오류가 발생했습니다."),;
    private final HttpStatus status;
    private final String code;
    private String message;

    CustomExceptionList(HttpStatus status, String code) {
        this.status = status;
        this.code = code;
    }

    CustomExceptionList(HttpStatus status, String code, String message) {
        this.status = status;
        this.code = code;
        this.message = message;
    }
}
