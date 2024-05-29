package com.example.SWALaborWebApp.service;


import com.example.SWALaborWebApp.model.User;
import com.example.SWALaborWebApp.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User registerUser(String login, String password, String email) {
        if (login == null || password == null) {
            return null;
        } else {
            User user = new User();
            user.setLogin(login);
            user.setPassword(password);
            user.setEmail(email);
            return userRepository.save(user);
        }
    }

    public User authenticate(String login, String password) {
        return userRepository.findByLoginAndPassword(login, password).orElse(null);
    }
}