package dju20.coupleshare.service.user;

import java.util.Optional;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import dju20.coupleshare.dto.users.login.CustomUserDetails;
import dju20.coupleshare.entity.User;
import dju20.coupleshare.repository.UsersRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

	private final UsersRepository usersRepository;
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		Optional<User> userData = usersRepository.findByUsername(username);

		if(userData.isPresent()){
			return new CustomUserDetails(userData.get());
		}
		return null;
	}
}
