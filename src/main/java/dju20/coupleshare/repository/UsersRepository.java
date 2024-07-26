package dju20.coupleshare.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import dju20.coupleshare.entity.User;

public interface UsersRepository extends JpaRepository<User, Long> {
	boolean existsByUsername(String username);
}
