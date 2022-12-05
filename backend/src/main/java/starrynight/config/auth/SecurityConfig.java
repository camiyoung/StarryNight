package starrynight.config.auth;


import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final OAuthService oAuthService;
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .headers().frameOptions().disable()
                .and()
                .cors().configurationSource(this.corsConfigurationSource())
                .and()
                .logout().logoutUrl("/")
                .and()
                .oauth2Login()
                .defaultSuccessUrl("/api/oauth/info", true)
                .userInfoEndpoint()
                .userService(oAuthService);
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOriginPattern("http://localhost:3000");
        configuration.addAllowedOriginPattern("http://localhost:8081");
        configuration.addAllowedOriginPattern("http://k7a605.p.ssafy.io:8081");
        configuration.addAllowedOriginPattern("https://k7a605.p.ssafy.io:8081");
        configuration.addAllowedOriginPattern("http://k7a605.p.ssafy.io:3000");
        configuration.addAllowedOriginPattern("https://k7a605.p.ssafy.io:3000");
        configuration.addAllowedOriginPattern("https://k7a605.p.ssafy.io");
        configuration.addAllowedOriginPattern("http://starry-night.kr:8081");
        configuration.addAllowedOriginPattern("https://starry-night.kr:8081");
        configuration.addAllowedOriginPattern("http://starry-night.kr:3000");
        configuration.addAllowedOriginPattern("https://starry-night.kr:3000");
        configuration.addAllowedOriginPattern("https://starry-night.kr");
        configuration.addAllowedOriginPattern("*");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
