package com.edutech.progressive.controller;

import com.edutech.progressive.dto.LoginRequest;
import com.edutech.progressive.dto.LoginResponse;
import com.edutech.progressive.dto.UserRegistrationDTO;
import org.springframework.http.ResponseEntity;

public class UserLoginController {
    public ResponseEntity<?> registerUser(UserRegistrationDTO registrationDTO) {
        return null;
    }

    public ResponseEntity<LoginResponse> loginUser(LoginRequest loginRequest) {
        return null;
    }

    public ResponseEntity<?> getUserDetails(int userId) {
        return null;
    }
}
