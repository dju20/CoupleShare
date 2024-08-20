package dju20.coupleshare.dto.user.register;

import dju20.coupleshare.enums.user.Sex;
import lombok.Getter;

@Getter
public class RegisterDto {
	private String username;
	private String password;
	private String email;
	private String realName;
	private Sex sex;
}
