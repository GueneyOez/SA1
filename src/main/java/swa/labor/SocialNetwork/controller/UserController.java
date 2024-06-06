package swa.labor.SocialNetwork.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import swa.labor.SocialNetwork.model.User;
import swa.labor.SocialNetwork.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public User register(@RequestParam String username, @RequestParam String password) {
        try {
            return userService.registerUser(username, password);
        } catch (Exception e) {
            // Handle registration error
            return null;
        }
    }

    @PostMapping("/login")
    public User login(@RequestParam String username, @RequestParam String password) {
        try {
            return userService.loginUser(username, password);
        } catch (Exception e) {
            // Handle login error
            return null;
        }
    }
}
