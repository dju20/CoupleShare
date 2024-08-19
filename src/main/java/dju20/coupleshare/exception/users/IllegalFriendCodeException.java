package dju20.coupleshare.exception.users;

public class IllegalFriendCodeException extends RuntimeException {
    public IllegalFriendCodeException() {
        super("유효하지 않은 친구 코드입니다");

    }

    public IllegalFriendCodeException(String message) {
        super(message);
    }
}
