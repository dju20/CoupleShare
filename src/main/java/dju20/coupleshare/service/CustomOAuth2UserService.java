package dju20.coupleshare.service;

import java.util.Optional;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthorizationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import dju20.coupleshare.dto.users.login.CustomOAuth2User;
import dju20.coupleshare.dto.users.response.GoogleResponse;
import dju20.coupleshare.dto.users.response.NaverResponse;
import dju20.coupleshare.dto.users.response.OAuth2Response;
import dju20.coupleshare.dto.users.login.SocialLoginDto;
import dju20.coupleshare.entity.User;
import dju20.coupleshare.enums.users.UserRole;
import dju20.coupleshare.repository.UsersRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
	private final UsersRepository usersRepository;

	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthorizationException {
		OAuth2User oAuth2User = super.loadUser(userRequest);
		System.out.println(oAuth2User);

		String registrationId = userRequest.getClientRegistration().getRegistrationId();
		OAuth2Response oAuth2Response = null;
		if(registrationId.equals("naver")){
			oAuth2Response = new NaverResponse(oAuth2User.getAttributes());
		}
		else if(registrationId.equals("google")){
			oAuth2Response = new GoogleResponse(oAuth2User.getAttributes());
		}
		else{
			return null;
		}
		//추후 작성

		SocialLoginDto socialLoginDto = findOrRegisterUser(oAuth2Response);
		return new CustomOAuth2User(socialLoginDto);
	}

	private SocialLoginDto findOrRegisterUser(OAuth2Response oAuth2Response) {
		Optional<User> optionalUser = usersRepository.findByProviderAndProviderId(oAuth2Response.getProvider(),
			oAuth2Response.getProviderId());

		User user = null;
		if (optionalUser.isPresent()) {
			user = optionalUser.get();
		} else {
			String username = oAuth2Response.getProvider()+" "+oAuth2Response.getProviderId();
			user = User.builder()
				.username(username)
				.email(oAuth2Response.getEmail())
				.realName(oAuth2Response.getName())
				.provider(oAuth2Response.getProvider())
				.providerId(oAuth2Response.getProviderId())
				.isCouple(false)
				.sex(oAuth2Response.getGender())
				.role(UserRole.ROLE_USER)
				.build();

			user = usersRepository.save(user);
		}
		return SocialLoginDto.builder()
			.username(user.getUsername())
			.realName(user.getRealName())
			.email(user.getEmail())
			.provider(user.getProvider())
			.providerId(user.getProviderId())
			.role(UserRole.ROLE_USER)
			.build();
	}
}
