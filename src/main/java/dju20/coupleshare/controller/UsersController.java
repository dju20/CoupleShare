package dju20.coupleshare.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dju20.coupleshare.dto.users.register.RegisterDto;
import dju20.coupleshare.service.UsersService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UsersController {
	private final UsersService usersService;

	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody RegisterDto registerDto) {

		try {
			usersService.saveUser(registerDto);
			return ResponseEntity.ok().build();
		} catch (Exception exception) {
			return ResponseEntity.badRequest().build();
		}
	}

}
