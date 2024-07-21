package dju20.coupleshare.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TestController {

	@GetMapping("/user")
	public User getUserData() {
		System.out.println("come");
		// 예시로 하드코딩된 사용자 정보 반환
		return new User("수현", "suhyun9764@naver.com");
	}

	// 사용자 정보를 담는 DTO 클래스
	public static class User {
		private String name;
		private String email;

		public User(String name, String email) {
			this.name = name;
			this.email = email;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}
	}


}