package dju20.coupleshare.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import dju20.coupleshare.dto.users.RegisterDto;
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
			.role(UserRole.USER)
			.provider("LOCAL")
			.build();

		try{
			usersRepository.save(userData);
		}catch (Exception e){
			throw new IllegalArgumentException("save exception");
		}

	}

	private void validateRegisterDto(RegisterDto registerDto) {
		if(usersRepository.existsByUsername(registerDto.getUsername())){
			throw new IllegalArgumentException("username duplication");
		}
	}
}
