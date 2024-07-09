package PointOfSales.ProjectPOS.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorizationManagerRequestMatcherRegistry ->
                        authorizationManagerRequestMatcherRegistry
                                .requestMatchers(
                                        "/api/v1/auth/**",
                                        "/pos/api/listcategory/**",
                                        "/pos/api/detailcategory/**",
                                        "/pos/api/addcategory/**",
                                        "/pos/api/editcategory/**",
                                        "/pos/api/deletecategory/**",
                                        "/pos/api/updatecategory/**",
                                        "/pos/api/listproduct/**",
                                        "/pos/api/detailproduct/**",
                                        "/pos/api/deleteproduct/**",
                                        "/pos/api/updateproduct/**",
                                        "/pos/api/addproduct/**",
                                        "/pos/api/listtransactions/**",
                                        "/pos/api/listtransaksidetail/**",
                                        "/pos/api/addtransaction/**"
                                ).permitAll()
                                .anyRequest().authenticated()
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}