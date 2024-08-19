package dju20.coupleshare.exception;

import dju20.coupleshare.exception.users.LoginUserException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class UsersExceptionHandler {
//    @ExceptionHandler(LoginUserException.class)
//    public ResponseEntity<String> loginUserException(LoginUserException e) {
//        return ResponseEntity.status(e.ge)
//    }
}
