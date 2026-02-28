package com.edutech.progressive;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.edutech.progressive.entity.Attendance;
import com.edutech.progressive.entity.Course;
import com.edutech.progressive.entity.Student;
import com.edutech.progressive.entity.Teacher;
import com.edutech.progressive.repository.*;
import com.edutech.progressive.service.impl.AttendanceServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = EduConnectApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class DayElevenTest {

   @Autowired
   private MockMvc mockMvc;

   @Autowired
   private ObjectMapper objectMapper;

   @Autowired
   private AttendanceServiceImpl attendanceService;

   @Autowired
   private AttendanceRepository attendanceRepository;
   @Autowired
   private StudentRepository studentRepository;
   @Autowired
   EnrollmentRepository enrollmentRepository;
   @Autowired
   CourseRepository courseRepository;
   @Autowired
   TeacherRepository teacherRepository;

   private Student student;
   private Teacher teacher;
   private Course course;

   @BeforeEach
   void setUp() {
       // Clean database before each test
       attendanceRepository.deleteAll();
       enrollmentRepository.deleteAll();
       studentRepository.deleteAll();
       courseRepository.deleteAll();
       teacherRepository.deleteAll();
       student = new Student();
       student.setFullName("John");
       student.setEmail("john@gmail.com");
       student.setStudentId(studentRepository.save(student).getStudentId());
       teacher = new Teacher();
       teacher.setFullName("Keats");
       teacher.setSubject("English");
       teacher.setEmail("keats@gmail.com");
       teacher.setTeacherId(teacherRepository.save(teacher).getTeacherId());
       course = new Course();
       course.setCourseName("English");
       course.setTeacher(teacher);
       course.setCourseId(courseRepository.save(course).getCourseId());
   }

   // Helper method to create Attendance object
   private Attendance createAttendance() {
       Attendance attendance = new Attendance();
       attendance.setStudent(student);
       attendance.setStatus("Present");
       attendance.setCourse(course);
       attendance.setAttendanceDate(new Date());
       return attendance;
   }

   /**
    * Test API: POST /attendance
    */
   @Test
   void testCreateAttendance_Day11() throws Exception {
       Attendance attendance = createAttendance();

       mockMvc.perform(post("/attendance")
                       .contentType(MediaType.APPLICATION_JSON)
                       .content(objectMapper.writeValueAsString(attendance)))
               .andExpect(status().isCreated());

       List<Attendance> attendanceList = attendanceRepository.findAll();
       assertEquals(1, attendanceList.size());
       assertEquals("Present", attendanceList.get(0).getStatus());
   }

   /**
    * Test API: GET /attendance
    */
   @Test
   void testGetAllAttendances_Day11() throws Exception {
       attendanceRepository.save(createAttendance());

       mockMvc.perform(get("/attendance")
                       .contentType(MediaType.APPLICATION_JSON))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.length()").value(1));
   }

   /**
    * Test API: GET /attendance/student/{studentId}
    */
   @Test
   void testGetAttendancesByStudentId_Day11() throws Exception {
       attendanceRepository.save(createAttendance());

       mockMvc.perform(get("/attendance/student/{studentId}", student.getStudentId())
                       .contentType(MediaType.APPLICATION_JSON))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.length()").value(1));
   }

   /**
    * Test Service: Delete Attendance
    */
   @Test
   void testDeleteAttendanceService_Day11() throws Exception {
       Attendance attendance = attendanceRepository.save(createAttendance());

       attendanceService.deleteAttendance(attendance.getAttendanceId());
       assertFalse(attendanceRepository.existsById(attendance.getAttendanceId()));
   }

}
