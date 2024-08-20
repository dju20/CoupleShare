package dju20.coupleshare.service.couple;

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
    public void sendRequest(String username, String friendCode) {
        User sendUser = userRepository.findByUsername(username).orElseThrow(()->
                new LoginUserException());
//
//        User requestUser = usersRepository.findByFriendCode(friendCode).orElseThrow(()->
//                new IllegalFriendCodeException());
//
//        if (requestUser.isPresent()) {
//
//        }
    }
}
