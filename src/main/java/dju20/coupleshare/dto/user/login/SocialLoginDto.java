package dju20.coupleshare.dto.user.login;

import dju20.coupleshare.enums.user.UserRole;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class SocialLoginDto {
	private String username;
	private String realName;
	private String email;
	private String provider;
	private String providerId;
	private UserRole role;

}
