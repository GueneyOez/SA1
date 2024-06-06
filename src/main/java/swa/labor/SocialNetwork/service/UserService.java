package swa.labor.SocialNetwork.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import swa.labor.SocialNetwork.model.User;
import swa.labor.SocialNetwork.repository.UserRepository;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User registerUser(String username, String password) throws Exception {
        if (userRepository.findByUsername(username).isPresent()) {
            throw new Exception("User already exists");
        }
        User user = new User();
        user.setUsername(username);
        user.setPassword(password); // In real application, password should be hashed
        return userRepository.save(user);
    }

    public User loginUser(String username, String password) throws Exception {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return user.get();
        } else {
            throw new Exception("Invalid credentials");
        }
    }
}