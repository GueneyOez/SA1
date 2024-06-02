package com.example.SWALaborWebApp.config;

import com.example.SWALaborWebApp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import org.springframework.security.web.SecurityFilterChain;


@Configuration
@EnableWebSecurity
public class SpringSecurityConfig {

    @Autowired
    UserService userService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .oauth2Login(oauth2 -> {
                    oauth2
                            .loginPage("/login")
                            .defaultSuccessUrl("/posts", true)
                            .failureUrl("/login")
                            .successHandler(new CustomSuccessHandler(userService));
                });
        return http.build();

    }

}
