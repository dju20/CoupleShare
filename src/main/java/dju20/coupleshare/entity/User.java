package dju20.coupleshare.entity;

import dju20.coupleshare.enums.users.Sex;
import dju20.coupleshare.enums.users.UserRole;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
	@Enumerated(EnumType.STRING)
	private Sex sex;

	private String password;
	private String realName;
	private String profileImg;
	private String email;
	private String provider;

	@Enumerated(EnumType.STRING)
	private UserRole role;

	@Builder
	public User(String username, Sex sex, String password, String realName, String profileImg, String email, String provider, UserRole role) {
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
