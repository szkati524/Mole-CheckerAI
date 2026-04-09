package com.example.MoleCheckerAI;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@SpringBootApplication
public class MoleCheckerAiApplication {

	public static void main(String[] args) {
		SpringApplication.run(MoleCheckerAiApplication.class, args);
	}

}
