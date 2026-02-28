package com.edutech.progressive;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.edutech.progressive.controller.StudentController;
import com.edutech.progressive.entity.Student;
import com.edutech.progressive.service.impl.StudentServiceImplArraylist;
import com.edutech.progressive.service.impl.StudentServiceImplJpa;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
public class DayFourTest {
   @Mock
   private StudentServiceImplJpa studentServiceImplJpa;

   @Mock
   private StudentServiceImplArraylist studentServiceImplArraylist;

   @InjectMocks
   private StudentController studentController;

   private ObjectMapper objectMapper;

   private MockMvc mockMvc;

   @BeforeEach
   public void setUp() {
       mockMvc = MockMvcBuilders.standaloneSetup(studentController).build();
       objectMapper = new ObjectMapper();
       String url = "jdbc:mysql://localhost:3306/mydb";
       String user = "root";
       String password = "root";
       try (Connection connection = DriverManager.getConnection(url, user, password);
            Statement statement = connection.createStatement()) {
           List<String> tableNames = List.of("teacher", "student", "course");
           for (String tableName : tableNames) {
               String deleteQuery = "DELETE FROM " + tableName;
               statement.executeUpdate(deleteQuery);
           }
       } catch (SQLException e) {
           e.printStackTrace();
       }
   }

//    // Helper classes to create Objects
//    Student getStudentObject(Integer id, String studentName) throws ParseException {
//        Student student = new Student();
//        if (id != null) {
//            student.setStudentId(id.intValue());
//        }
//        student.setFullName(studentName);
//        student.setContactNumber("9876543210");
//        student.setEmail("mary@gmail.com");
//        student.setDateOfBirth(new SimpleDateFormat("yyyy-MM-dd").parse("1985-06-15"));
//        return student;
//    }

   // Day - 4
   @Test
   public void testMainMethodOutput_Day4() {
       SpringApplication app = new SpringApplication(EduConnectApplication.class);
       app.setDefaultProperties(Collections.singletonMap("server.port", "9999"));
       ConfigurableApplicationContext context = app.run();
       assertNotNull(context);
       context.close();
   }

//    // Day - 5 : Test cases for ArrayList Service methods
//    @Test
//    void testAddStudentToArrayList_Day5() throws Exception {
//        Student student = getStudentObject(1, "John");
//        given(studentServiceImplArraylist.addStudent(student)).willReturn(1);

//        mockMvc.perform(post("/student/toArrayList")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(student)))
//                .andExpect(status().isCreated());
//    }

//    @Test
//    void testGetAllStudentsSortedByNameFromArrayList_Day5() throws Exception {
//        StudentServiceImplArraylist studentServiceImplArray = new StudentServiceImplArraylist();
//        studentServiceImplArray.emptyArrayList();
//        Student student1 = getStudentObject(1, "John");
//        Student student2 = getStudentObject(2, "Mary");
//        Student student3 = getStudentObject(3, "Smith");
//        studentServiceImplArray.addStudent(student1);
//        studentServiceImplArray.addStudent(student2);
//        studentServiceImplArray.addStudent(student3);

//        List<Student> result = studentServiceImplArray.getAllStudentSortedByName();

//        given(studentServiceImplArraylist.getAllStudentSortedByName()).willReturn(result);
//        mockMvc.perform(get("/student/fromArrayList/sorted"))
//                .andExpect(jsonPath("$[0].fullName").value(student1.getFullName()));
//    }

//    @Test
//    void testGetAllStudent_Day5() throws Exception {
//        StudentServiceImplArraylist studentServiceImplArray = new StudentServiceImplArraylist();
//        studentServiceImplArray.emptyArrayList();
//        Student student1 = getStudentObject(1, "John");
//        Student student2 = getStudentObject(2, "Mary");
//        Student student3 = getStudentObject(3, "Smith");
//        studentServiceImplArray.addStudent(student1);
//        studentServiceImplArray.addStudent(student2);
//        studentServiceImplArray.addStudent(student3);

//        List<Student> result = studentServiceImplArray.getAllStudents();
//        given(studentServiceImplArraylist.getAllStudents()).willReturn(result);

//        mockMvc.perform(get("/student/fromArrayList"))
//                .andExpect(jsonPath("$.size()").value(3));
//    }

}



