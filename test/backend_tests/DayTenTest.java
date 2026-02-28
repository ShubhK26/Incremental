package com.edutech.progressive;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.edutech.progressive.entity.Enrollment;
import com.edutech.progressive.entity.Course;
import com.edutech.progressive.entity.Teacher;
import com.edutech.progressive.entity.Student;
import com.edutech.progressive.repository.EnrollmentRepository;
import com.edutech.progressive.repository.CourseRepository;
import com.edutech.progressive.repository.TeacherRepository;
import com.edutech.progressive.repository.StudentRepository;
import com.edutech.progressive.service.impl.EnrollmentServiceImpl;
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

import java.lang.reflect.Field;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = EduConnectApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class DayTenTest {

   @Autowired
   private MockMvc mockMvc;

   @Autowired
   EnrollmentServiceImpl enrollmentService;

   @Autowired
   EnrollmentRepository enrollmentRepository;

   @Autowired
   StudentRepository studentRepository;

   @Autowired
   CourseRepository courseRepository;

   @Autowired
   TeacherRepository teacherRepository;

   @Autowired
   private ObjectMapper objectMapper;

   @BeforeEach
   public void setUp() throws SQLException {
       objectMapper = new ObjectMapper();
       enrollmentRepository.deleteAll();
       courseRepository.deleteAll();
       teacherRepository.deleteAll();
       studentRepository.deleteAll();
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

   Enrollment getEnrollmentObject(Integer id, Student student, Course course) throws ParseException {
       Enrollment enrollment = new Enrollment();
       enrollment.setEnrollmentDate(new SimpleDateFormat("yyyy-MM-dd").parse("2024-11-27"));
       setDynamicProperty(enrollment, "student", student);
       setDynamicProperty(enrollment, "course", course);
       return enrollment;
   }

   public void setDynamicProperty(Object entity, String propertyName, Object value) {
       try {
           Field field = entity.getClass().getDeclaredField(propertyName);
           field.setAccessible(true);
           field.set(entity, value);
       } catch (Exception e) {
           // Handle exception
       }
   }

   @Test
   void testServiceGetAllEnrollments_Day10() throws ParseException {
       Student student1 = getStudentObject(null, "Test student");
       student1.setStudentId(studentRepository.save(student1).getStudentId());

       Student student2 = getStudentObject(null, "Mary");
       student2.setStudentId(studentRepository.save(student2).getStudentId());

       Teacher teacher1 = getTeacherObject(null, "John", 10);
       teacher1.setTeacherId(teacherRepository.save(teacher1).getTeacherId());

       Course course = getCourseObject(null, teacher1, "English");
       course.setCourseId(courseRepository.save(course).getCourseId());

       Enrollment enrollment1 = getEnrollmentObject(null, student1, course);
       Enrollment enrollment2 = getEnrollmentObject(null, student2, course);

       enrollmentRepository.save(enrollment1);
       enrollmentRepository.save(enrollment2);

       List<Enrollment> enrollments = enrollmentService.getAllEnrollments();

       assertEquals(2, enrollments.size());
   }

   @Test
   void testServiceGetEnrollmentById_Day10() throws ParseException {
       Student student1 = getStudentObject(null, "Test student");
       student1.setStudentId(studentRepository.save(student1).getStudentId());

       Teacher teacher1 = getTeacherObject(null, "John", 10);
       teacher1.setTeacherId(teacherRepository.save(teacher1).getTeacherId());

       Course course = getCourseObject(null, teacher1, "English");
       course.setCourseId(courseRepository.save(course).getCourseId());

       Enrollment enrollment1 = getEnrollmentObject(null, student1, course);
       int id = enrollmentRepository.save(enrollment1).getEnrollmentId();
       Enrollment fetchedEnrollment = enrollmentService.getEnrollmentById(id);

       assertNotNull(fetchedEnrollment);
       assertEquals(enrollment1.getEnrollmentId(), fetchedEnrollment.getEnrollmentId());
   }


   @Test
   void testControllerCreateEnrollment_Day10() throws Exception {
       Student student1 = getStudentObject(null, "Test student");
       student1.setStudentId(studentRepository.save(student1).getStudentId());

       Teacher teacher1 = getTeacherObject(null, "John", 10);
       teacher1.setTeacherId(teacherRepository.save(teacher1).getTeacherId());

       Course course = getCourseObject(null, teacher1, "English");
       course.setCourseId(courseRepository.save(course).getCourseId());

       Enrollment enrollment = getEnrollmentObject(null, student1, course);

       mockMvc.perform(post("/enrollment")
                       .contentType(MediaType.APPLICATION_JSON)
                       .content(objectMapper.writeValueAsString(enrollment)))
               .andExpect(status().isCreated());
   }

}
