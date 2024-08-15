package dju20.coupleshare.entity;

import dju20.coupleshare.enums.users.Sex;
import dju20.coupleshare.enums.users.UserRole;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
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
	private String providerId;
	private Boolean isCouple;

	@Enumerated(EnumType.STRING)
	private UserRole role;

	private String friendCode;

	// @Builder
	// public User(String username, Sex sex, String password, String realName, String profileImg, String email, String provider, String providerId, Boolean isCouple, UserRole role) {
	// 	this.username = username;
	// 	this.sex = sex;
	// 	this.password = password;
	// 	this.realName = realName;
	// 	this.profileImg = profileImg;
	// 	this.email = email;
	// 	this.provider = provider;
	// 	this.providerId = providerId;
	// 	this.isCouple = isCouple;
	// 	this.role = role;
	// }


}
