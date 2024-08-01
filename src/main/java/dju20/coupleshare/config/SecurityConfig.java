package dju20.coupleshare.config;

import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import dju20.coupleshare.jwt.JwtFilter;
import dju20.coupleshare.jwt.JwtUtil;
import dju20.coupleshare.jwt.LoginFilter;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

	private final AuthenticationConfiguration authenticationConfiguration;
	private final JwtUtil jwtUtil;

	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
		return configuration.getAuthenticationManager();
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

		http
			.cors((cors) -> cors
				.configurationSource(new CorsConfigurationSource() {
					@Override
					public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
						CorsConfiguration corsConfiguration = new CorsConfiguration();

						corsConfiguration.setAllowedOrigins(Collections.singletonList("http://localhost:3000"));
						corsConfiguration.setAllowedMethods(Collections.singletonList("*"));
						corsConfiguration.setAllowCredentials(true);
						corsConfiguration.setAllowedHeaders(Collections.singletonList("*"));
						corsConfiguration.setMaxAge(3600L);

						corsConfiguration.setExposedHeaders(Collections.singletonList("Authorization"));

						return corsConfiguration;
					}
				}));
		http
			.csrf((auth) -> auth.disable());

		http
			.formLogin((auth) -> auth.disable());

		http
			.httpBasic((auth) -> auth.disable());

		http
			.authorizeHttpRequests((auth) -> auth
				.requestMatchers("/api/users/**").permitAll()
				.requestMatchers("/api/app/**").hasRole("USER")
				.anyRequest().authenticated());

		http
			.addFilterBefore(new JwtFilter(jwtUtil), LoginFilter.class);

		LoginFilter loginFilter = new LoginFilter(authenticationManager(authenticationConfiguration), jwtUtil);
		loginFilter.setFilterProcessesUrl("/api/users/login");

		http
			.addFilterAt(loginFilter, UsernamePasswordAuthenticationFilter.class);
		http
			.sessionManagement((session) -> session
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

		return http.build();
	}
}
