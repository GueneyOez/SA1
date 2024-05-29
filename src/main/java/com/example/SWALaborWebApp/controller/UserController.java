package com.example.SWALaborWebApp.controller;

import com.example.SWALaborWebApp.model.User;
import com.example.SWALaborWebApp.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import jakarta.servlet.http.HttpSession;

@Controller
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/register")
    public String getRegisterPage(Model model) {
        model.addAttribute("registerRequest", new User());
        return "register_page";
    }

    @GetMapping("/login")
    public String getLoginPage(Model model) {
        model.addAttribute("loginRequest", new User());
        return "login_page";
    }

    @PostMapping("/register")
    public String register(@ModelAttribute User user) {
        System.out.println("register request: " + user);
        User registeredUser = userService.registerUser(user.getLogin(), user.getPassword(), user.getEmail());
        return registeredUser == null ? "error_page" : "redirect:/login";
    }

    @PostMapping("/login")
    public String login(@ModelAttribute User user, HttpSession session, Model model) {
        System.out.println("login request: " + user);
        User authenticated = userService.authenticate(user.getLogin(), user.getPassword());
        if (authenticated != null) {
            session.setAttribute("userLogin", authenticated);
            model.addAttribute("userLogin", authenticated.getLogin());
            return "personal_page";
        } else {
            return "error_page";
        }
    }
}