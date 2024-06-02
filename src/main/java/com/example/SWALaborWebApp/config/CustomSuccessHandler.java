package com.example.SWALaborWebApp.config;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import com.example.SWALaborWebApp.service.UserService;
import java.io.IOException;

//dieses Video und die Repo in der Beschreibung war größtenteils hilfreich: https://youtu.be/-b_dRDixTN0

@Component
public class CustomSuccessHandler implements AuthenticationSuccessHandler {

    private final UserService userService;

    public CustomSuccessHandler(UserService userService) {
        this.userService = userService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        String redirectUrl = "/posts";

        if (authentication.getPrincipal() instanceof DefaultOAuth2User) {
            DefaultOAuth2User userDetails = (DefaultOAuth2User) authentication.getPrincipal();
            String login = userDetails.getAttribute("login");
            String password = userDetails.getAttribute("password"); // Dies ist wahrscheinlich nicht verfügbar
            String email = userDetails.getAttribute("email");
            //Integer id = userDetails.getAttribute("id");

            // Überprüfen, ob der Benutzer bereits registriert ist
            if (userService.authenticate(login, password) == null) {
                // Wenn der Benutzer nicht registriert ist, registriere ihn
                userService.registerUser(login, password, email);
            }
            //request.getSession().setAttribute("userLogin", userDetails);
        }

        // Leite den Benutzer zur Zielseite um
        new DefaultRedirectStrategy().sendRedirect(request, response, redirectUrl);
    }
}
