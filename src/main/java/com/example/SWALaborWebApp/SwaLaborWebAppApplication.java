package com.example.SWALaborWebApp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

@SpringBootApplication
public class SwaLaborWebAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(SwaLaborWebAppApplication.class, args);

		BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
		openBrowser("http://localhost:8080");
	}
	public static void openBrowser(String url) {
		try {
			String os = System.getProperty("os.name").toLowerCase();
			Runtime rt = Runtime.getRuntime();

			if (os.contains("win")) {
				// Windows
				rt.exec("rundll32 url.dll,FileProtocolHandler " + url);
			} else if (os.contains("mac")) {
				// Mac OS
				rt.exec("open " + url);
			} else if (os.contains("nix") || os.contains("nux")) {
				// Linux/Unix
				String[] browsers = {"xdg-open", "gnome-open", "firefox", "chrome", "chromium"};
				for (String browser : browsers) {
					if (Runtime.getRuntime().exec(new String[]{"which", browser}).getInputStream().read() != -1) {
						rt.exec(new String[]{browser, url});
						break;
					}
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@GetMapping("/hello")
	public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
		return String.format("Hello %s!", name);
	}
}