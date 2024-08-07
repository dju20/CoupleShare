package dju20.coupleshare.dto.users;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class CustomOAuth2User implements OAuth2User {

	private final SocialLoginDto socialLoginDto;
	@Override
	public Map<String, Object> getAttributes() {
		return null;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		Collection<GrantedAuthority> collection = new ArrayList<>();
		collection.add(new GrantedAuthority() {
			@Override
			public String getAuthority() {
				return socialLoginDto.getRole().toString();
			}
		});
		return collection;
	}

	@Override
	public String getName() {
		return socialLoginDto.getRealName();
	}

	public String getUserName(){
		return socialLoginDto.getUsername();
	}
}
