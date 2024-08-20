package dju20.coupleshare.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import dju20.coupleshare.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
	boolean existsByUsername(String username);
	Optional<User> findByUsername(String username);

	Optional<User> findByProviderAndProviderId(String provider, String providerId);

	Optional<User> findByEmail(String email);

//    boolean existsByFriendCode(String friendCode);

//	Optional<User> findByFriendCode(String friendCode);
}
