package com.edutech.progressive;

import com.edutech.progressive.entity.Course;
import com.edutech.progressive.entity.Teacher;
import com.edutech.progressive.entity.Student;
import com.edutech.progressive.exception.CourseNotFoundException;
import com.edutech.progressive.exception.TeacherAlreadyExistsException;
import com.edutech.progressive.exception.StudentAlreadyExistsException;
import com.edutech.progressive.repository.TeacherRepository;
import com.edutech.progressive.repository.StudentRepository;
import com.edutech.progressive.service.impl.CourseServiceImplJpa;
import com.edutech.progressive.service.impl.TeacherServiceImplJpa;
import com.edutech.progressive.service.impl.StudentServiceImplJpa;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.lang.reflect.Field;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = EduConnectApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class DayNineTest {

   @Autowired
   StudentRepository studentRepository;
   @Autowired
   TeacherRepository teacherRepository;
   @Autowired
   StudentServiceImplJpa studentServiceImplJpa;
   @Autowired
   TeacherServiceImplJpa teacherServiceImplJpa;
   @Autowired
   CourseServiceImplJpa courseServiceImplJpa;

   @BeforeEach
   public void setUp() throws SQLException {
       String url = "jdbc:mysql://localhost:3306/mydb";
       String user = "root";
       String password = "root";
       try (Connection connection = DriverManager.getConnection(url, user, password);
            Statement statement = connection.createStatement()) {
           String deleteQuery = "DELETE FROM teacher";
           statement.executeUpdate(deleteQuery);

           deleteQuery = "DELETE FROM student";
           statement.executeUpdate(deleteQuery);
           deleteQuery = "DELETE FROM course";
           statement.executeUpdate(deleteQuery);
       } catch (SQLException e) {
           e.printStackTrace();
       }
       MockitoAnnotations.openMocks(this);
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
            // Handle exception
        }
    }

   @Test
   void testAddStudentThrowsStudentAlreadyExistsException_Day9() throws ParseException {
       Student student = getStudentObject(null, "John Keats");
       studentRepository.save(student);

       assertThrows(StudentAlreadyExistsException.class, () -> studentServiceImplJpa.addStudent(student));
   }

   @Test
   void testAddTeacherThrowsTeacherAlreadyExistsException_Day9() {
       Teacher teacher = getTeacherObject(null, "John Keats", 10);
       teacherRepository.save(teacher);

       assertThrows(TeacherAlreadyExistsException.class, () -> teacherServiceImplJpa.addTeacher(teacher));
   }

    @Test
    void testCourseNotFoundException_Day9() {
        assertThrows(CourseNotFoundException.class, () -> courseServiceImplJpa.getCourseById(1));
    }

    @Test
    void testDoesNotThrowTeacherAlreadyExistsException_Day9() {
        Teacher teacher = getTeacherObject(null, "John Keats", 10);
        assertDoesNotThrow(() -> teacherServiceImplJpa.addTeacher(teacher));
    }
}
