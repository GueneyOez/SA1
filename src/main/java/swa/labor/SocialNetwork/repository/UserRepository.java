package swa.labor.SocialNetwork.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import swa.labor.SocialNetwork.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Optional<User> findById(Integer authorId);
}
