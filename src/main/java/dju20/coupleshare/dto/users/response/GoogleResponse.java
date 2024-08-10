package dju20.coupleshare.dto.users.response;

import java.util.Map;

import dju20.coupleshare.enums.users.Sex;

public class GoogleResponse implements OAuth2Response {
	private final Map<String,Object> attribute;

	public GoogleResponse(Map<String, Object> attribute) {
		this.attribute = attribute;
	}

	@Override
	public String getProvider() {
		return "google";
	}

	@Override
	public String getProviderId() {
		return attribute.get("sub").toString();
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
	public Sex getGender() {
		return null;
	}
}
