package dju20.coupleshare.service.util;

import org.springframework.stereotype.Service;

import dju20.coupleshare.repository.UsersRepository;
import dju20.coupleshare.util.CoupleCodeGenerator;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommonUtilServiceImpl implements CommonUtilService {

	private final UsersRepository usersRepository;
	private static final int FRIEND_CODE_LENGTH = 10;
	@Override
	public String generateCoupleCode() {
		String coupleCode;
//		do{
//			coupleCode= CoupleCodeGenerator.generate(FRIEND_CODE_LENGTH);
//		}while (usersRepository.existsByFriendCode(coupleCode));

		return null;
	}
}
