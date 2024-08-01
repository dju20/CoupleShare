package dju20.coupleshare.dto.users;

import dju20.coupleshare.enums.users.Sex;
import lombok.Getter;

@Getter
public class RegisterDto {
	private String username;
	private String password;
	private String email;
	private String realName;
	private Sex sex;
}
