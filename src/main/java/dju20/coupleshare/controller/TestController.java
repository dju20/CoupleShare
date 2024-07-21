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

	@PostMapping("/submit")
	public Response submitData(@RequestBody Data data) {
		// 데이터 처리 로직 (예: 데이터베이스 저장 등)
		System.out.println("Received data: " + data.getEmail());
		System.out.println("Received data: " + data.getName());

		// 응답을 반환
		return new Response("Data submitted successfully!");
	}

	// 데이터 클래스
	public static class Data {
		private String name;
		private String email;

		// Getters and setters
		public String getName() { return name; }
		public void setName(String name) { this.name = name; }
		public String getEmail() { return email; }
		public void setEmail(String email) { this.email = email; }
	}

	// 응답 클래스
	public static class Response {
		private String message;

		public Response(String message) {
			this.message = message;
		}

		public String getMessage() { return message; }
		public void setMessage(String message) { this.message = message; }
	}
}
