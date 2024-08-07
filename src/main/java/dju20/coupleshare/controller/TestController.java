package dju20.coupleshare.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dju20.coupleshare.dto.users.CustomUserDetails;
import dju20.coupleshare.entity.User;
import dju20.coupleshare.repository.UsersRepository;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class TestController {
	private final UsersRepository usersRepository;

	//test  주석
	@GetMapping("/user")
	public User getUserData(@AuthenticationPrincipal CustomUserDetails userDetails) {
		String username = userDetails.getUsername();
		User user = usersRepository.findByUsername(username);
		return user;
	}



	@GetMapping("/app/test")
	public String testUser(@AuthenticationPrincipal CustomUserDetails userDetails) {
		String username = userDetails.getUsername();
		return username;
	}

}