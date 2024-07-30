package dju20.coupleshare.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import dju20.coupleshare.dto.CustomUserDetails;
import dju20.coupleshare.entity.User;
import dju20.coupleshare.repository.UsersRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

	private final UsersRepository usersRepository;
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		User userData = usersRepository.findByUsername(username);

		if(userData!=null){
			return new CustomUserDetails(userData);
		}
		return null;
	}
}
