package dju20.coupleshare.service.couple;

import dju20.coupleshare.entity.Couple;
import dju20.coupleshare.repository.CoupleRepository;
import dju20.coupleshare.dto.couple.CoupleCodeRequestDto;
import dju20.coupleshare.entity.User;
import dju20.coupleshare.enums.user.CoupleStatus;
import dju20.coupleshare.exception.user.LoginUserException;
import dju20.coupleshare.repository.UserRepository;
import dju20.coupleshare.util.CoupleCodeGenerator;
import jakarta.transaction.Transactional;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CoupleServiceImpl implements CoupleService {
    private final UserRepository userRepository;
    private final RedisTemplate redisTemplate;
    private final CoupleRepository coupleRepository;

    @Override
    @Transactional
    public String generateCoupleCode(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() ->
                new LoginUserException());

        ValueOperations valueOperations = redisTemplate.opsForValue();
        if(user.getCoupleStatus()!= CoupleStatus.SOLO)
            throw new IllegalArgumentException();

        try {
            String coupleCode = getUniqueCoupleCode(valueOperations, user);
            return coupleCode;
        }catch (Exception e){
            throw new IllegalArgumentException();
        }
    }

    private String getUniqueCoupleCode(ValueOperations valueOperations, User user) {
        String coupleCode;
        do {
            coupleCode = CoupleCodeGenerator.generate(10);
        }while (valueOperations.get(coupleCode)!=null);

        valueOperations.set(coupleCode,user.getId(),Duration.ofDays(1));
        user.changeCoupleStatusToWAIT();
        return coupleCode;
    }

    @Override
    public void matchCouple(String username, CoupleCodeRequestDto coupleCodeRequestDto) {

    }
}
