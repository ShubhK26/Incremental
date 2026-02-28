package com.edutech.progressive;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.edutech.progressive.entity.Course;
import com.edutech.progressive.entity.Teacher;
import com.edutech.progressive.entity.Student;
import com.edutech.progressive.repository.CourseRepository;
import com.edutech.progressive.repository.TeacherRepository;
import com.edutech.progressive.repository.StudentRepository;
import com.edutech.progressive.service.CourseService;
import com.edutech.progressive.service.TeacherService;
import com.edutech.progressive.service.StudentService;
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
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.lang.reflect.Field;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = EduConnectApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class DayEightTest {

   private ObjectMapper objectMapper;

   @Autowired
   CourseRepository courseRepository;
   @Autowired
   TeacherRepository teacherRepository;
   @Autowired
   StudentRepository studentRepository;

   @Autowired
   private MockMvc mockMvc;

   @Autowired
   private WebApplicationContext webApplicationContext;

   @BeforeEach
   public void setUp() {
       objectMapper = new ObjectMapper();
       mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
       String url = "jdbc:mysql://localhost:3306/mydb";
       String user = "root";
       String password = "root";
       try (Connection connection = DriverManager.getConnection(url, user, password);
            Statement statement = connection.createStatement()) {
           String deleteQuery = "DELETE FROM course";
           statement.executeUpdate(deleteQuery);

           deleteQuery = "DELETE FROM student";
           statement.executeUpdate(deleteQuery);

           deleteQuery = "DELETE FROM teacher";
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

   // Day - 6 Test cases

//    @Test
//    void testGetAllStudent_Day6() throws Exception {
//        StudentService studentService = new StudentServiceImplJpa(studentRepository);
//        Student students1 = getStudentObject(null, "Dhoni");
//        Student students2 = getStudentObject(null, "Virat");
//        studentService.addStudent(students1);
//        studentService.addStudent(students2);

//        List<Student> result = studentService.getAllStudents();

//        assertNotNull(result);
//        assertEquals(2, result.size());
//    }

//    @Test
//    void testGetAllStudentsSortedByName_Day6() throws Exception {
//        StudentService studentService = new StudentServiceImplJpa(studentRepository);
//        Student students1 = getStudentObject(null, "Dhoni");
//        Student students2 = getStudentObject(null, "Virat");
//        Student students3 = getStudentObject(null, "Warner");
//        studentService.addStudent(students1);
//        studentService.addStudent(students2);
//        studentService.addStudent(students3);

//        List<Student> sortedStudent = studentService.getAllStudentSortedByName();

//        assertEquals(sortedStudent.get(0).getFullName(), students1.getFullName());
//    }

//    @Test
//    void testUpdateStudentController_Day6() throws Exception {
//        StudentService studentService = new StudentServiceImplJpa(studentRepository);
//        Student students1 = getStudentObject(null, "Dhoni");
//        int studentId = studentService.addStudent(students1);
//        students1.setStudentId(studentId);

//        students1.setFullName("Smith");
//        mockMvc.perform(put("/student/" + studentId)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(students1)))
//                .andExpect(status().isOk());
//        Student updatedStudent = studentService.getStudentById(studentId);
//        assertEquals("Smith", updatedStudent.getFullName());
//    }

//    @Test
//    void testDeleteStudentController_Day6() throws Exception {
//        StudentService studentService = new StudentServiceImplJpa(studentRepository);

//        Student students1 = getStudentObject(null, "Dhoni");
//        int studentId = studentService.addStudent(students1);

//        mockMvc.perform(delete("/student/" + studentId).contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isNoContent());
//        assertNull(studentService.getStudentById(studentId));
//    }

//    // Day - 7 Test cases

//    @Test
//    public void testAddTeacherController_Day7() throws Exception {
//        Teacher teacher = getTeacherObject(1, "John", 10);

//        mockMvc.perform(post("/teacher")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(teacher)))
//                .andExpect(status().isCreated());
//        List<Teacher> teachers = teacherRepository.findAll();
//        assertEquals(1, teachers.size());
//        assertEquals("John", teachers.get(0).getFullName());
//    }

//    @Test
//    public void testUpdateTeacherController_Day7() throws Exception {
//        Teacher teacher = getTeacherObject(1, "John", 10);
//        teacher = teacherRepository.save(teacher);

//        teacher.setFullName("John Keats");

//        mockMvc.perform(put("/teacher/" + teacher.getTeacherId())
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(teacher)))
//                .andExpect(status().isOk());

//        Teacher teacherUpdated = teacherRepository.findById(teacher.getTeacherId()).get();
//        assertEquals(teacherUpdated.getFullName(), teacher.getFullName());
//    }

//    @Test
//    public void testDeleteTeacherController_Day7() throws Exception {
//        TeacherService teacherService = new TeacherServiceImplJpa(teacherRepository);
//        Teacher teacher1 = getTeacherObject(1, "John", 10);
//        teacher1.setTeacherId(teacherService.addTeacher(teacher1));

//        mockMvc.perform(delete("/teacher/" + teacher1.getTeacherId()))
//                .andExpect(status().isNoContent());
//    }

//    @Test
//    void testGetAllTeacher_Day7() throws Exception {
//        TeacherService teacherService = new TeacherServiceImplJpa(teacherRepository);
//        Teacher teacher1 = getTeacherObject(1, "John", 10);
//        Teacher teacher2 = getTeacherObject(null, "Mary", 5);
//        teacherService.addTeacher(teacher1);
//        teacherService.addTeacher(teacher2);

//        List<Teacher> result = teacherService.getAllTeachers();

//        assertEquals(2, result.size());
//    }

//    @Test
//    void testGetTeacherById_Day7() throws Exception {
//        TeacherService teacherService = new TeacherServiceImplJpa(teacherRepository);

//        Teacher teacher1 = getTeacherObject(null, "John", 10);
//        int id = teacherService.addTeacher(teacher1);

//        Teacher result = teacherService.getTeacherById(id);

//        assertEquals(result.getTeacherId(), id);
//        assertEquals("John", result.getFullName());
//    }

   // Day - 8 Test cases

   @Test
   public void testGetAllCoursesController_Day8() throws Exception {
       CourseService courseService = new CourseServiceImplJpa(courseRepository);
       TeacherService teacherService = new TeacherServiceImplJpa(teacherRepository);
       Teacher teacher1 = getTeacherObject(null, "John", 10);
       teacher1.setTeacherId(teacherService.addTeacher(teacher1));
       Teacher teacher2 = getTeacherObject(null, "Mary", 5);
       teacher2.setTeacherId(teacherService.addTeacher(teacher2));

       Course course1 = getCourseObject(null, teacher1, "English");
       Course course2 = getCourseObject(null, teacher2, "French");
       Course course3 = getCourseObject(null, teacher1, "German");
       courseService.addCourse(course1);
       courseService.addCourse(course2);
       courseService.addCourse(course3);

       List<Course> courseList = courseService.getAllCourses();
       mockMvc.perform(get("/course").contentType(MediaType.APPLICATION_JSON))
               .andExpect(jsonPath("$.size()").value(courseList.size()));
   }

   @Test
   public void testUpdateCourse_Day8() throws Exception {
       CourseService courseService = new CourseServiceImplJpa(courseRepository);
       TeacherService teacherService = new TeacherServiceImplJpa(teacherRepository);
       Teacher teacher1 = getTeacherObject(1, "John", 10);
       teacher1.setTeacherId(teacherService.addTeacher(teacher1));

       Course course1 = getCourseObject(null, teacher1, "French");
       course1.setCourseId(courseService.addCourse(course1));

       course1.setCourseName("English");
       courseService.updateCourse(course1);

       Course updatedCourse = courseService.getCourseById(course1.getCourseId());
       assertNotNull(updatedCourse);
       assertEquals("English", course1.getCourseName());
   }

   @Test
   public void testDeleteCourse_Day8() throws Exception {
       CourseService courseService = new CourseServiceImplJpa(courseRepository);
       TeacherService teacherService = new TeacherServiceImplJpa(teacherRepository);
       Teacher teacher1 = getTeacherObject(1, "John", 10);
       teacher1.setTeacherId(teacherService.addTeacher(teacher1));

       Course course1 = getCourseObject(null, teacher1, "English");

       int courseId = courseService.addCourse(course1);

       assertNotEquals(-1, courseId);
       assertNotEquals(0, courseId);

       courseService.deleteCourse(courseId);

       assertNull(courseService.getCourseById(courseId));

   }
}
