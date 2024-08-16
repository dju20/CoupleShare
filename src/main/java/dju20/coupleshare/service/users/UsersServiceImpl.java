package dju20.coupleshare.service.users;

import dju20.coupleshare.dto.users.response.UserResponseDto;
import dju20.coupleshare.dto.users.search.FindUserByFriendCodeDto;
import dju20.coupleshare.dto.users.register.RegisterDto;
import dju20.coupleshare.entity.User;
import dju20.coupleshare.enums.users.UserRole;
import dju20.coupleshare.repository.UsersRepository;
import dju20.coupleshare.service.util.CommonUtilService;
import dju20.coupleshare.util.FriendCodeGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UsersServiceImpl implements UsersService {

	private final UsersRepository usersRepository;
	private final BCryptPasswordEncoder bCryptPasswordEncoder;
	private final CommonUtilService commonUtilService;

	@Override
	public void saveUser(RegisterDto registerDto) {
		validateRegisterDto(registerDto);

		User user = User.builder()
			.username(registerDto.getUsername())
			.password(bCryptPasswordEncoder.encode(registerDto.getPassword()))
			.email(registerDto.getEmail())
			.realName(registerDto.getRealName())
			.sex(registerDto.getSex())
			.role(UserRole.ROLE_USER)
			.isCouple(false)
			.friendCode(commonUtilService.generateUniqueFriendCode())
			.provider("LOCAL")
			.build();

		usersRepository.save(user);
	}

	private void validateRegisterDto(RegisterDto registerDto) {
		if (usersRepository.existsByUsername(registerDto.getUsername())) {
			throw new IllegalArgumentException("Username already exists.");
		}
	}

	@Override
	public Optional<UserResponseDto> findUserByFriendCode(FindUserByFriendCodeDto findUserByFriendCodeDto) {
		return usersRepository.findByFriendCode(findUserByFriendCodeDto.getFriendCode())
			.map(user -> UserResponseDto.builder()
				.realName(user.getRealName())
				.sex(user.getSex().toString())
				.isCouple(user.getIsCouple())
				.build());
	}
}
