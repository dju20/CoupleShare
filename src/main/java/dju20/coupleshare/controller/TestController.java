package dju20.coupleshare.controller;

import java.util.Optional;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dju20.coupleshare.dto.user.login.CustomUserDetails;
import dju20.coupleshare.entity.User;
import dju20.coupleshare.repository.UserRepository;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class TestController {
	private final UserRepository userRepository;

	//test  주석
	@GetMapping("/user")
	public User getUserData(@AuthenticationPrincipal CustomUserDetails userDetails) {
		String username = userDetails.getUsername();
		Optional<User> user = userRepository.findByUsername(username);
		return user.orElse(null);
	}



	@GetMapping("/app/test")
	public String testUser(@AuthenticationPrincipal CustomUserDetails userDetails) {
		String username = userDetails.getUsername();
		return username;
	}

}