package dju20.coupleshare.service.users;

import dju20.coupleshare.dto.users.register.RegisterDto;
import dju20.coupleshare.dto.users.response.UserResponseDto;
import java.util.Optional;

public interface UsersService {

    void saveUser(RegisterDto registerDto);

    Optional<UserResponseDto> findUserByFriendCode(String friendCode);


}
