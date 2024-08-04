package dju20.coupleshare.dto.users;

import dju20.coupleshare.enums.users.Sex;

public interface OAuth2Response {

	// 제공자
	String getProvider();

	// 제공자에서 발급해주는 아이디(번호)
	String getProviderId();

	String getEmail();
	String getName();
	Sex getGender();
}
