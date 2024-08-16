package dju20.coupleshare.service.users;

import java.util.Optional;

import dju20.coupleshare.dto.users.register.RegisterDto;
import dju20.coupleshare.dto.users.response.UserResponseDto;
import dju20.coupleshare.dto.users.search.FindUserByFriendCodeDto;

public interface UsersService {
	void saveUser(RegisterDto registerDto);
	Optional<UserResponseDto> findUserByFriendCode(FindUserByFriendCodeDto findUserByFriendCodeDto);


}
