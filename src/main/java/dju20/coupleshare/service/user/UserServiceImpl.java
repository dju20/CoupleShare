package dju20.coupleshare.service.user;

import dju20.coupleshare.dto.user.register.RegisterDto;
import dju20.coupleshare.entity.User;
import dju20.coupleshare.enums.user.CoupleStatus;
import dju20.coupleshare.enums.user.UserRole;
import dju20.coupleshare.repository.UserRepository;
import dju20.coupleshare.service.util.CommonUtilService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
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
                .coupleStatus(CoupleStatus.SOLO)
                .provider("local")
                .build();

        userRepository.save(user);
    }

    private void validateRegisterDto(RegisterDto registerDto) {
        if (userRepository.existsByUsername(registerDto.getUsername())) {
            throw new IllegalArgumentException("Username already exists.");
        }
    }

}
