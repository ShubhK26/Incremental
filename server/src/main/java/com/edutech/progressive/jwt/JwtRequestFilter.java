
// package com.edutech.progressive.jwt;

// import io.jsonwebtoken.Claims;
// import io.jsonwebtoken.ExpiredJwtException;
// import io.jsonwebtoken.MalformedJwtException;
// import io.jsonwebtoken.SignatureException;
// import io.jsonwebtoken.UnsupportedJwtException;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.GrantedAuthority;
// import org.springframework.security.core.authority.AuthorityUtils;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.stereotype.Component;
// import org.springframework.web.filter.OncePerRequestFilter;

// import javax.servlet.FilterChain;
// import javax.servlet.ServletException;
// import javax.servlet.http.HttpServletRequest;
// import javax.servlet.http.HttpServletResponse;
// import java.io.IOException;
// import java.util.Collection;

// @Component
// public class JwtRequestFilter extends OncePerRequestFilter {
//     private final UserDetailsService userDetailsService;
//     private final JwtUtil jwtUtil;

//     @Autowired
//     public JwtRequestFilter(UserDetailsService userDetailsService, JwtUtil jwtUtil) {
//         this.userDetailsService = userDetailsService;
//         this.jwtUtil = jwtUtil;
//     }

//     @Override
//     protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
//                                     FilterChain filterChain) throws ServletException, IOException {
//         final String authorizationHeader = request.getHeader("Authorization");

//         String jwt = null;
//         Integer userId = null;

//         if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
//             jwt = authorizationHeader.substring(7);
//             try {
//                 Claims claims = jwtUtil.extractAllClaims(jwt);
//                 userId = (Integer) claims.get("userId"); // Extract userId from token claims
//             } catch (ExpiredJwtException | UnsupportedJwtException | MalformedJwtException |
//                      SignatureException | IllegalArgumentException e) {
//             }
//         }

//         if (userId != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//             UserDetails userDetails = userDetailsService.loadUserByUsername(String.valueOf(userId));

//             if (jwtUtil.validateToken(jwt, userDetails)) {
//                 Claims claims = jwtUtil.extractAllClaims(jwt);
//                 Collection<? extends GrantedAuthority> authorities =
//                         AuthorityUtils.createAuthorityList((String) claims.get("role"));

//                 UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
//                         userDetails, null, authorities);
//                 SecurityContextHolder.getContext().setAuthentication(authentication);
//             }
//         }

//         filterChain.doFilter(request, response);
//     }
// }
