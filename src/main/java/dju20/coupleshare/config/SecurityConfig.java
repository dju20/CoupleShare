package dju20.coupleshare.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
		http
			.csrf((auth)->auth.disable());

		http
			.formLogin((auth)->auth.disable());

		http
			.httpBasic((auth)->auth.disable());

		http
			.authorizeHttpRequests((auth)->auth
				.requestMatchers("/api/users/**").permitAll()
				.anyRequest().authenticated());

		http
			.sessionManagement((session)->session
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

		return http.build();
	}
}
