package dju20.coupleshare.controller;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dju20.coupleshare.dto.users.response.UserResponseDto;
import dju20.coupleshare.dto.users.search.FindUserByEmailDto;
import dju20.coupleshare.entity.User;
import dju20.coupleshare.service.UsersService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/app/search")
public class SearchController {
	private final UsersService usersService;
	@PostMapping("/user")
	public ResponseEntity<UserResponseDto> searchUser(@RequestBody FindUserByEmailDto findUserByEmailDto){
		try{
			Optional<UserResponseDto> userResponseDto = usersService.findUserByEmail(findUserByEmailDto);
			if(userResponseDto.isPresent())
				return ResponseEntity.ok(userResponseDto.get());

			return null;
		}catch (Exception exception){
			return ResponseEntity.badRequest().build();
		}
	}

}
