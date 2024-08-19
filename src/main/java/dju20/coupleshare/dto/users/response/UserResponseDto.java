package dju20.coupleshare.dto.users.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserResponseDto {
	private String realName;
	private String email;
	private String sex;
	private Boolean isCouple;
}
