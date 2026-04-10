package com.example.MoleCheckerAI;

import com.example.MoleCheckerAI.entity.User;
import com.example.MoleCheckerAI.enums.Role;
import com.example.MoleCheckerAI.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableAsync
@SpringBootApplication
public class MoleCheckerAiApplication {

	public static void main(String[] args) {
		SpringApplication.run(MoleCheckerAiApplication.class, args);
	}
	@Bean
	CommandLineRunner initAdmin(UserRepository userRepository, PasswordEncoder passwordEncoder){
		return args -> {
			if (userRepository.findByUsername("admin").isEmpty()) {
				User admin = new User();
				admin.setUsername("admin");
				admin.setEmail("admin@o2.pl");
				admin.setPassword(passwordEncoder.encode("admin123"));
				admin.setRole(Role.ADMIN);
				userRepository.save(admin);
				System.out.println("=========================================");
				System.out.println("  UTWORZONO KONTO ADMINA PRZY STARCIE!   ");
				System.out.println("  Login: admin                           ");
				System.out.println("  Hasło: admin123                        ");
				System.out.println("=========================================");
			} else {
				System.out.println(">>> Konto admina już istnieje w bazie.");
			}
		};
	}
}
