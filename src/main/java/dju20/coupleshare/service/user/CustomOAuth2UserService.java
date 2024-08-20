package dju20.coupleshare.service.user;

import dju20.coupleshare.dto.users.login.CustomOAuth2User;
import dju20.coupleshare.dto.users.login.SocialLoginDto;
import dju20.coupleshare.dto.users.response.GoogleResponse;
import dju20.coupleshare.dto.users.response.NaverResponse;
import dju20.coupleshare.dto.users.response.OAuth2Response;
import dju20.coupleshare.entity.User;
import dju20.coupleshare.enums.users.UserRole;
import dju20.coupleshare.repository.UsersRepository;
import dju20.coupleshare.service.util.CommonUtilService;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthorizationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UsersRepository usersRepository;
    private final CommonUtilService commonUtilService;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthorizationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        OAuth2Response oAuth2Response = createOAuth2Response(registrationId, oAuth2User.getAttributes());

        if (oAuth2Response == null) {
            throw new IllegalArgumentException("Unsupported registration ID: " + registrationId);
        }

        SocialLoginDto socialLoginDto = findOrRegisterUser(oAuth2Response);
        return new CustomOAuth2User(socialLoginDto);
    }

    private OAuth2Response createOAuth2Response(String registrationId, Map<String, Object> attributes) {
        switch (registrationId) {
            case "naver":
                return new NaverResponse(attributes);
            case "google":
                return new GoogleResponse(attributes);
            default:
                return null;
        }
    }

    private SocialLoginDto findOrRegisterUser(OAuth2Response oAuth2Response) {
        return usersRepository.findByProviderAndProviderId(oAuth2Response.getProvider(), oAuth2Response.getProviderId())
            .map(this::mapToSocialLoginDto)
            .orElseGet(() -> registerNewUser(oAuth2Response));
    }

    private SocialLoginDto registerNewUser(OAuth2Response oAuth2Response) {
        User newUser = User.builder()
            .username(oAuth2Response.getProvider() + " " + oAuth2Response.getProviderId())
            .email(oAuth2Response.getEmail())
            .realName(oAuth2Response.getName())
            .provider(oAuth2Response.getProvider())
            .providerId(oAuth2Response.getProviderId())
            .isCouple(false)
            .sex(oAuth2Response.getGender())
            .role(UserRole.ROLE_USER)
            .build();

        User savedUser = usersRepository.save(newUser);
        return mapToSocialLoginDto(savedUser);
    }

    private SocialLoginDto mapToSocialLoginDto(User user) {
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
