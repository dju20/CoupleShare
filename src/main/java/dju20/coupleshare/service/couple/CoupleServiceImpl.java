package dju20.coupleshare.service.couple;

import dju20.coupleshare.dto.couple.CoupleCodeRequestDto;
import dju20.coupleshare.entity.User;
import dju20.coupleshare.exception.user.LoginUserException;
import dju20.coupleshare.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CoupleServiceImpl implements CoupleService {
    private final UserRepository userRepository;

    @Override
    public String generateCoupleCode(String username) {
        return "";
    }

    @Override
    public void matchCouple(String username, CoupleCodeRequestDto coupleCodeRequestDto) {

    }
}
