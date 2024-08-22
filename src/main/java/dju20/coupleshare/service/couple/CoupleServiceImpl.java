package dju20.coupleshare.service.couple;

import dju20.coupleshare.dto.couple.CoupleCodeRequestDto;
import dju20.coupleshare.entity.Couple;
import dju20.coupleshare.entity.User;
import dju20.coupleshare.enums.user.CoupleStatus;
import dju20.coupleshare.exception.user.LoginUserException;
import dju20.coupleshare.repository.CoupleRepository;
import dju20.coupleshare.repository.UserRepository;
import dju20.coupleshare.util.CoupleCodeGenerator;
import jakarta.transaction.Transactional;
import java.time.Duration;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CoupleServiceImpl implements CoupleService {
    private final UserRepository userRepository;
    private final StringRedisTemplate redisTemplate;
    private final CoupleRepository coupleRepository;
    private final ValueOperations valueOperations = redisTemplate.opsForValue();

    @Override
    @Transactional
    public String generateCoupleCode(String username) {
        User user = getUserByUsername(username);

        validationIsCoupleUser(user);

        if (user.getCoupleStatus() == CoupleStatus.WAIT) {
            return valueOperations.get(user.getId().toString()).toString();
        }

        String coupleCode = getUniqueCoupleCode(valueOperations);
        saveCoupleCode(valueOperations, coupleCode, user);
        return coupleCode;
    }

    private User getUserByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(() ->
                new LoginUserException());
    }

    private static void validationIsCoupleUser(User user) {
        if (user.getCoupleStatus() == CoupleStatus.COUPLE) {
            throw new IllegalArgumentException();
        }
    }

    private String getUniqueCoupleCode(ValueOperations valueOperations) {
        String coupleCode;
        do {
            coupleCode = CoupleCodeGenerator.generate(10);
        } while (valueOperations.get(coupleCode) != null);

        return coupleCode;
    }

    private static void saveCoupleCode(ValueOperations valueOperations, String coupleCode, User user) {
        try {
            valueOperations.set(coupleCode, user.getId().toString(), Duration.ofDays(1));
            valueOperations.set(user.getId().toString(), coupleCode, Duration.ofDays(1));
            user.changeCoupleStatusToWAIT();
        } catch (Exception e) {
            throw new IllegalArgumentException();
        }
    }

    @Override
    public void matchCouple(String username, CoupleCodeRequestDto coupleCodeRequestDto) {
        User user = getUserByUsername(username);

        String coupleCodeCreatorId = valueOperations.get(coupleCodeRequestDto.getCoupleCode()).toString();
        validateCoupleCodeCreatorId(coupleCodeCreatorId);
        User coupleCodeCreator = getUserById(coupleCodeCreatorId);

        createAndSaveCouple(coupleCodeCreator, user);
        removeCoupleCodeFromRedis(coupleCodeRequestDto, coupleCodeCreatorId);
    }

    private static void validateCoupleCodeCreatorId(String coupleCodeCreatorId) {
        if (coupleCodeCreatorId == null) {
            throw new IllegalArgumentException();
        }
    }

    private User getUserById(String coupleCodeCreatorId) {
        User coupleCodeCreator = userRepository.findById(Long.parseLong(coupleCodeCreatorId)).orElseThrow(() ->
                new IllegalArgumentException());
        return coupleCodeCreator;
    }

    private void createAndSaveCouple(User coupleCodeCreator, User user) {
        Couple couple = Couple.builder()
                .user1(coupleCodeCreator)
                .user2(user)
                .build();
        try {
            user.changeCoupleStatusToCouple();
            coupleCodeCreator.changeCoupleStatusToCouple();
            coupleRepository.save(couple);
        } catch (Exception e) {
            throw new IllegalArgumentException();
        }
    }

    private void removeCoupleCodeFromRedis(CoupleCodeRequestDto coupleCodeRequestDto, String coupleCodeCreatorId) {
        redisTemplate.delete(coupleCodeCreatorId);
        redisTemplate.delete(coupleCodeRequestDto.getCoupleCode());
    }

}
