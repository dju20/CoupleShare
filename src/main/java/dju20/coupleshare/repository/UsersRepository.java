package dju20.coupleshare.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import dju20.coupleshare.entity.User;

public interface UsersRepository extends JpaRepository<User, Long> {
	boolean existsByUsername(String username);
	User findByUsername(String username);

	Optional<User> findByProviderAndProviderId(String provider, String providerId);

	Optional<User> findByEmail(String email);

    boolean existsByFriendCode(String friendCode);

	Optional<User> findByFriendCode(String friendCode);
}
