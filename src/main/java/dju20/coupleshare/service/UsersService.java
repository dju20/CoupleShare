package dju20.coupleshare.service;

import dju20.coupleshare.util.FriendCodeGenerator;
import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import dju20.coupleshare.dto.users.response.UserResponseDto;
import dju20.coupleshare.dto.users.search.FindUserByFriendCodeDto;
import dju20.coupleshare.dto.users.register.RegisterDto;
import dju20.coupleshare.entity.User;
import dju20.coupleshare.enums.users.UserRole;
import dju20.coupleshare.repository.UsersRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UsersService {
	private final UsersRepository usersRepository;
	private final BCryptPasswordEncoder bCryptPasswordEncoder;

	public void saveUser(RegisterDto registerDto){
		validateRegisterDto(registerDto);

		User userData = User.builder()
			.username(registerDto.getUsername())
			.password(bCryptPasswordEncoder.encode(registerDto.getPassword()))
			.email(registerDto.getEmail())
			.realName(registerDto.getRealName())
			.sex(registerDto.getSex())
			.role(UserRole.ROLE_USER)
			.isCouple(false)
				.friendCode(generateFriendCode())
			.provider("LOCAL")
			.build();

		try{
			usersRepository.save(userData);
		}catch (Exception e){
			throw new IllegalArgumentException("save exception");
		}

	}

	private String generateFriendCode() {
		boolean isUnique = false;
		String friendCode = null;
		while (isUnique==false){
			friendCode = FriendCodeGenerator.generate(10);
			if(usersRepository.existsByFriendCode(friendCode)==false){
				isUnique = true;
			}
		}

		return friendCode;
	}

	private void validateRegisterDto(RegisterDto registerDto) {
		if(usersRepository.existsByUsername(registerDto.getUsername())){
			throw new IllegalArgumentException("username duplication");
		}
	}

	public Optional<UserResponseDto> findUserByFriendCode(FindUserByFriendCodeDto findUserByFriendCodeDto) {
		try {
			String friendCode = findUserByFriendCodeDto.getFriendCode();
			Optional<User> findUser = usersRepository.findByFriendCode(friendCode);
			if(findUser.isPresent()){
				User user = findUser.get();
				UserResponseDto userResponseDto = UserResponseDto.builder()
					.realName(user.getRealName())
					.sex(user.getSex().toString())
					.isCouple(user.getIsCouple())
					.build();

				return Optional.ofNullable(userResponseDto);
			}
			return null;
		}catch (Exception exception){
			throw new IllegalArgumentException();
		}

	}
}
