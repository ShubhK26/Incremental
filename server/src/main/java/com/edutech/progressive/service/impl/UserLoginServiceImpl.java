package com.edutech.progressive.service.impl;

import com.edutech.progressive.dto.UserRegistrationDTO;
import com.edutech.progressive.entity.Student;
import com.edutech.progressive.entity.Teacher;
import com.edutech.progressive.entity.User;
import com.edutech.progressive.repository.StudentRepository;
import com.edutech.progressive.repository.TeacherRepository;
import com.edutech.progressive.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserLoginServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserLoginServiceImpl(UserRepository userRepository,
            StudentRepository studentRepository,
            TeacherRepository teacherRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void registerUser(UserRegistrationDTO dto) throws Exception {

        // Check if username exists
        if (userRepository.findByUsername(dto.getUsername()) != null) {
            throw new Exception("Username already exists");
        }

        // Create base User entity
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setRole(dto.getRole());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setRole(dto.getRole());
        userRepository.save(user);

        // Save role-specific data
        if ("TEACHER".equals(dto.getRole())) {
            var teacher = new Teacher();
            teacher.setEmail(dto.getEmail());
            teacher.setSubject(dto.getSubject());
            teacher.setYearsOfExperience(dto.getYearsOfExperience());
            teacherRepository.save(teacher);
        }

        if ("STUDENT".equals(dto.getRole())) {
            var student = new Student();
            student.setEmail(dto.getEmail());
            student.setDateOfBirth(dto.getDateOfBirth());
            student.setAddress(dto.getAddress());
            studentRepository.save(student);
        }
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User getUserDetails(int userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
    }

    
@Override
public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userRepository.findByUsername(username);

    if (user == null) {
        throw new UsernameNotFoundException("User not found");
    }

    return org.springframework.security.core.userdetails.User
            .withUsername(user.getUsername())
            .password(user.getPassword())   // hashed password
            .roles(user.getRole())          // STUDENT / TEACHER / ADMIN
            .build();
}
 
}
