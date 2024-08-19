package dju20.coupleshare.controller;

import dju20.coupleshare.dto.users.response.UserResponseDto;
import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dju20.coupleshare.dto.users.register.RegisterDto;
import dju20.coupleshare.service.users.UsersServiceImpl;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UsersController {
	private final UsersServiceImpl usersServiceImpl;

	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody RegisterDto registerDto) {

		try {
			usersServiceImpl.saveUser(registerDto);
			return ResponseEntity.ok().build();
		} catch (Exception exception) {
			return ResponseEntity.badRequest().build();
		}
	}

	@GetMapping("/{friendCode}")
	public ResponseEntity<UserResponseDto> searchUser(@PathVariable String friendCode){
		try{
			Optional<UserResponseDto> userResponseDto = usersServiceImpl.findUserByFriendCode(friendCode);
			if(userResponseDto.isPresent())
				return ResponseEntity.ok(userResponseDto.get());

			return null;
		}catch (Exception exception){
			return ResponseEntity.badRequest().build();
		}
	}

}
