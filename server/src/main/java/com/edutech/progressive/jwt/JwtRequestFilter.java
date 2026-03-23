
package com.edutech.progressive.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collection;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {
    private final UserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;

    @Autowired
    public JwtRequestFilter(UserDetailsService userDetailsService, JwtUtil jwtUtil) {
        this.userDetailsService = userDetailsService;
        this.jwtUtil = jwtUtil;
    }

   @Override
protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                FilterChain filterChain) throws ServletException, IOException {

    final String authorizationHeader = request.getHeader("Authorization");

    String jwt = null;

    if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
        jwt = authorizationHeader.substring(7);

        try {
            Claims claims = jwtUtil.extractAllClaims(jwt);

            String role = (String) claims.get("role");

            if (role != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                Collection<? extends GrantedAuthority> authorities =
                        AuthorityUtils.createAuthorityList(role);

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(null, null, authorities);

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }

        } catch (Exception e) {
            System.out.println("JWT Error: " + e.getMessage());
        }
    }

    filterChain.doFilter(request, response);
}}
