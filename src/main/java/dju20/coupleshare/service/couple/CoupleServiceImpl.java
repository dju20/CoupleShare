package dju20.coupleshare.service.couple;

import dju20.coupleshare.entity.User;
import dju20.coupleshare.exception.users.IllegalFriendCodeException;
import dju20.coupleshare.exception.users.LoginUserException;
import dju20.coupleshare.repository.UsersRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CoupleServiceImpl implements CoupleService {
    private final UsersRepository usersRepository;

    @Override
    public void sendRequest(String username, String friendCode) {
        User sendUser = usersRepository.findByUsername(username).orElseThrow(()->
                new LoginUserException());

        User requestUser = usersRepository.findByFriendCode(friendCode).orElseThrow(()->
                new IllegalFriendCodeException());
//
//        if (requestUser.isPresent()) {
//
//        }
    }
}
