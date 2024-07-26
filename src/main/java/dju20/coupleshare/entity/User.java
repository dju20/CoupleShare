package dju20.coupleshare.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String username;
	private String sex;
	private String password;
	private String realName;
	private String profileImg;
	private String email;
	private String provider;
	private String role;

	@Builder
	public User(String username, String sex, String password, String realName, String profileImg, String email, String provider, String role) {
		this.username = username;
		this.sex = sex;
		this.password = password;
		this.realName = realName;
		this.profileImg = profileImg;
		this.email = email;
		this.provider = provider;
		this.role = role;
	}


}
