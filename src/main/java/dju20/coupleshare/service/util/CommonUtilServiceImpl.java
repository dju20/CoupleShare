package dju20.coupleshare.service.util;

import org.springframework.stereotype.Service;

import dju20.coupleshare.repository.UsersRepository;
import dju20.coupleshare.util.FriendCodeGenerator;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommonUtilServiceImpl implements CommonUtilService {

	private final UsersRepository usersRepository;
	private static final int FRIEND_CODE_LENGTH = 10;
	@Override
	public String generateUniqueFriendCode() {
		String friendCode;
		do{
			friendCode=FriendCodeGenerator.generate(FRIEND_CODE_LENGTH);
		}while (usersRepository.existsByFriendCode(friendCode));

		return friendCode;
	}
}
