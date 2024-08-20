package dju20.coupleshare.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dju20.coupleshare.dto.user.register.RegisterDto;
import dju20.coupleshare.service.user.UserServiceImpl;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
	private final UserServiceImpl usersServiceImpl;

	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody RegisterDto registerDto) {

		try {
			usersServiceImpl.saveUser(registerDto);
			return ResponseEntity.ok().build();
		} catch (Exception exception) {
			return ResponseEntity.badRequest().build();
		}
	}



}
