package com.edutech.progressive;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.edutech.progressive.controller.UserLoginController;
import com.edutech.progressive.dto.LoginRequest;
import com.edutech.progressive.dto.LoginResponse;
import com.edutech.progressive.dto.UserRegistrationDTO;
import com.edutech.progressive.entity.*;
import com.edutech.progressive.jwt.JwtUtil;
import com.edutech.progressive.repository.*;
import com.edutech.progressive.service.impl.UserLoginServiceImpl;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.lang.reflect.Field;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class DayTwelveTest {
    @Mock
    private UserLoginServiceImpl userLoginService;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtUtil jwtUtil;

    @Mock
    private UserRepository userRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserLoginController userLoginController;

    @InjectMocks
    private UserLoginServiceImpl userLoginServiceImpl;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private final String secret = "secretKey000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";

    @BeforeEach
    void setup() {
        attendanceRepository.deleteAll();
        enrollmentRepository.deleteAll();
        studentRepository.deleteAll();
        courseRepository.deleteAll();
        teacherRepository.deleteAll();
        String url = "jdbc:mysql://localhost:3306/mydb";
        String user = "root";
        String password = "root";
        try (Connection connection = DriverManager.getConnection(url, user, password);
             Statement statement = connection.createStatement()) {
            statement.executeUpdate("DELETE FROM user");
            statement.executeUpdate("DELETE FROM student");
            statement.executeUpdate("DELETE FROM teacher");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Helper classes to create Objects
    Teacher getTeacherObject(Integer id, String name, int experience) {
        Teacher teacher = new Teacher();
        if (id != null) {
            teacher.setTeacherId(id.intValue());
        }
        teacher.setFullName(name);
        teacher.setContactNumber("9876543210");
        teacher.setEmail("john@gmail.com");
        teacher.setSubject("English");
        teacher.setYearsOfExperience(experience);
        return teacher;
    }

    Student getStudentObject(Integer id, String studentName) throws ParseException {
        Student student = new Student();
        if (id != null) {
            student.setStudentId(id.intValue());
        }
        student.setFullName(studentName);
        student.setContactNumber("9876543210");
        student.setEmail("mary@gmail.com");
        student.setDateOfBirth(new SimpleDateFormat("yyyy-MM-dd").parse("1985-06-15"));
        return student;
    }

    Course getCourseObject(Integer id, Teacher teacher, String name) {
        Course course = new Course();
        if (id != null) {
            course.setCourseId(id);
        }
        setDynamicProperty(course, "teacher", teacher);
        course.setCourseName(name);
        course.setDescription("testing desc");
        return course;
    }

    public void setDynamicProperty(Object entity, String propertyName, Object value) {
        try {
            Field field = entity.getClass().getDeclaredField(propertyName);
            field.setAccessible(true);
            field.set(entity, value);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    void testGenerateToken_Day12() {
        User user = new User();
        user.setUsername("testUser");
        user.setPassword("Password@123");
        user.setUserId(1);
        user.setRole("STUDENT");

        when(userRepository.findByUsername("testUser")).thenReturn(user);

        String token = Jwts.builder()
                .setSubject("testUser")
                .claim("role", "STUDENT")
                .signWith(io.jsonwebtoken.SignatureAlgorithm.HS512, secret)
                .compact();

        when(jwtUtil.generateToken("testUser")).thenReturn(token);

        Claims claims = Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();

        assertEquals("STUDENT", claims.get("role"));
    }

    @Test
    void testValidateToken_Day12() {
        UserDetails userDetails = mock(UserDetails.class);
        when(userDetails.getUsername()).thenReturn("123");
        Map<String, Object> claimsMap = new HashMap<>();
        claimsMap.put("userId", 123);
        claimsMap.put("role", "STUDENT");

        String token = Jwts.builder()
                .setClaims(claimsMap)
                .setSubject("123")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000))
                .signWith(io.jsonwebtoken.SignatureAlgorithm.HS512, secret)
                .compact();

        when(jwtUtil.validateToken(token, userDetails)).thenReturn(true);

        assertTrue(jwtUtil.validateToken(token, userDetails));
    }

    @Test
    @WithMockUser(authorities = {"STUDENT"})
    void testGetStudent_Day12() throws Exception {
        Student student = getStudentObject(null, "John");
        int id = studentRepository.save(student).getStudentId();
        mockMvc.perform(get("/student/" + id))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    @WithMockUser(authorities = {"STUDENT"})
    void testUnauthorisedAddTeacher_Day12() throws Exception {
        mockMvc.perform(post("/teacher"))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = {"TEACHER"})
    public void testTeacherControllerAddTeacher_Day12() throws Exception {
        Teacher teacher = getTeacherObject(null, "john", 10);
        mockMvc.perform(post("/teacher")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(teacher)))
                .andExpect(status().isCreated());

        List<Teacher> teacherList = teacherRepository.findAll();
        assertEquals(1, teacherList.size());
        assertEquals("john", teacherList.get(0).getFullName());
    }

    @Test
    @WithMockUser(authorities = {"TEACHER"})
    public void testAddCourse_Day12() throws Exception {
        Teacher teacher1 = getTeacherObject(1, "John", 10);
        teacher1.setTeacherId(teacherRepository.save(teacher1).getTeacherId());

        Course course1 = getCourseObject(null, teacher1, "English");
        mockMvc.perform(post("/course")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(course1)))
                .andExpect(status().isCreated());

        List<Course> courseList = courseRepository.findAll();
        assertEquals(1, courseList.size());
        assertEquals("English", courseList.get(0).getCourseName());
    }

    // @Test
    // void testRegisterUser_Failure_Day13() throws Exception {
    //     UserRegistrationDTO dto = new UserRegistrationDTO();
    //     dto.setUsername("testuser");
    //     dto.setPassword("password");
    //     dto.setRole("INVALID_ROLE");

    //     doThrow(new RuntimeException("Invalid role. Only 'STUDENT' or 'TEACHER' allowed.")).when(userLoginService).registerUser(dto);

    //     ResponseEntity<?> response = userLoginController.registerUser(dto);
    //     assertEquals(400, response.getStatusCodeValue());
    //     assertEquals("Invalid role. Only 'STUDENT' or 'TEACHER' allowed.", response.getBody());
    // }

    // @Test
    // void testLoginUser_Success_Day13() throws ParseException {
    //     LoginRequest loginRequest = new LoginRequest();
    //     loginRequest.setUsername("testUser");
    //     loginRequest.setPassword("password");

    //     UserDetails userDetails = mock(UserDetails.class);

    //     Student student = getStudentObject(1, "John");
    //     User user = new User();
    //     user.setUsername("testUser");
    //     user.setPassword("Password@123");
    //     user.setUserId(1);
    //     user.setRole("STUDENT");
    //     user.setStudent(student);

    //     when(userRepository.findByUsername("testUser")).thenReturn(user);
    //     when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(null);
    //     when(userLoginService.loadUserByUsername("testUser")).thenReturn(userDetails);
    //     when(userLoginService.getUserByUsername("testUser")).thenReturn(user);
    //     when(jwtUtil.generateToken("testUser")).thenReturn("mockToken");

    //     ResponseEntity<LoginResponse> response = userLoginController.loginUser(loginRequest);
    //     assertEquals(200, response.getStatusCodeValue());
    //     assertEquals("mockToken", response.getBody().getToken());
    //     assertEquals(1, response.getBody().getUserId());
    // }

    // @Test
    // void testGetUserDetails_Success_Day13() {
    //     User user = new User();
    //     user.setUserId(123);
    //     user.setUsername("meaningfulTestUser");

    //     when(userLoginService.getUserDetails(123)).thenReturn(user);

    //     ResponseEntity<?> response = userLoginController.getUserDetails(123);
    //     assertEquals(200, response.getStatusCodeValue());
    //     assertEquals(user, response.getBody());

    //     when(userRepository.findById(123)).thenReturn(Optional.of(user));

    //     User result = userLoginServiceImpl.getUserDetails(123);
    //     assertEquals(123, result.getUserId());
    // }

    // @Test
    // void testGetUserDetails_UserNotFound_Day13() {
    //     when(userLoginService.getUserDetails(123)).thenThrow(new RuntimeException("User not found with ID: 123"));

    //     ResponseEntity<?> response = userLoginController.getUserDetails(123);
    //     assertEquals(400, response.getStatusCodeValue());
    //     assertEquals("User not found with ID: 123", response.getBody());

    //     when(userRepository.findById(123)).thenReturn(Optional.empty());

    //     Exception exception = assertThrows(RuntimeException.class, () -> userLoginServiceImpl.getUserDetails(123));
    //     assertEquals("User not found with ID: 123", exception.getMessage());
    // }
}
