package starrynight;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class StarrynightApplication {

	public static void main(String[] args) {
		SpringApplication.run(StarrynightApplication.class, args);
	}

}
