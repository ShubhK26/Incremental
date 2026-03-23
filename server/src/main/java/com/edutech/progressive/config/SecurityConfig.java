package com.edutech.progressive.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.edutech.progressive.jwt.JwtRequestFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final UserDetailsService userDetailsService;
    private final JwtRequestFilter jwtRequestFilter;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public SecurityConfig(UserDetailsService userDetailsService,
            JwtRequestFilter jwtRequestFilter,
            PasswordEncoder passwordEncoder) {
        this.userDetailsService = userDetailsService;
        this.jwtRequestFilter = jwtRequestFilter;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
        .cors().and().csrf().disable()
                .authorizeRequests()
                .antMatchers("/user/register", "/user/login").permitAll()
                .antMatchers(HttpMethod.GET, "/student/**").hasAnyAuthority("STUDENT", "TEACHER")
                .antMatchers(HttpMethod.POST, "/student/**").hasAuthority("STUDENT")
                .antMatchers(HttpMethod.PUT, "/student/**").hasAuthority("STUDENT")
                .antMatchers(HttpMethod.DELETE, "/student/**").hasAuthority("STUDENT")
                .antMatchers(HttpMethod.GET, "/course/**").hasAnyAuthority("STUDENT", "TEACHER")
                .antMatchers(HttpMethod.POST, "/course/**").hasAuthority("TEACHER")
                .antMatchers(HttpMethod.PUT, "/course/**").hasAuthority("TEACHER")
                .antMatchers(HttpMethod.DELETE, "/course/**").hasAuthority("TEACHER")
                .antMatchers(HttpMethod.GET, "/teacher/**").hasAnyAuthority("STUDENT", "TEACHER")
                .antMatchers(HttpMethod.POST, "/teacher/**").hasAuthority("TEACHER")
                .antMatchers(HttpMethod.PUT, "/teacher/**").hasAuthority("TEACHER")
                .antMatchers(HttpMethod.DELETE, "/teacher/**").hasAuthority("TEACHER")
                .antMatchers(HttpMethod.GET, "/attendance/**").hasAnyAuthority("STUDENT", "TEACHER")
                .antMatchers(HttpMethod.POST, "/attendance/**").hasAuthority("TEACHER")
                .antMatchers(HttpMethod.DELETE, "/attendance/**").hasAuthority("TEACHER")
                .antMatchers("/enrollment/**").hasAnyAuthority("STUDENT", "TEACHER")
                 .anyRequest().permitAll()
                .and()
                // .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}
