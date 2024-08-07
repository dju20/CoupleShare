package dju20.coupleshare.dto.users;

import java.util.Map;

import dju20.coupleshare.enums.users.Sex;

public class NaverResponse implements OAuth2Response{

	private final Map<String ,Object> attribute;

	public NaverResponse(Map<String, Object> attribute) {
		this.attribute = (Map<String, Object>)attribute.get("response");
	}

	@Override
	public String getProvider() {
		return "naver";
	}

	@Override
	public String getProviderId() {
		return attribute.get("id").toString();
	}

	@Override
	public String getEmail() {
		return attribute.get("email").toString();
	}

	@Override
	public String getName() {
		return attribute.get("name").toString();
	}

	@Override
	public Sex getGender(){
		if(attribute.get("gender").equals("F"))
			return Sex.FEMALE;

		else if(attribute.get("gender").equals("M"))
			return Sex.MALE;

		return Sex.UNKNOWN;
	}

}
