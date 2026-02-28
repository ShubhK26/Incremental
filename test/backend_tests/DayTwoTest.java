package com.edutech.progressive;

import com.edutech.progressive.dao.StudentDAOImpl;
import com.edutech.progressive.dao.CourseDAOImpl;
import com.edutech.progressive.dao.TeacherDAOImpl;
import com.edutech.progressive.entity.Student;
import com.edutech.progressive.entity.Course;
import com.edutech.progressive.entity.Teacher;
import com.edutech.progressive.service.StudentService;
import com.edutech.progressive.service.CourseService;
import com.edutech.progressive.service.TeacherService;
import com.edutech.progressive.service.impl.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.sql.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class DayTwoTest
 {
 private TeacherService teacherService;
 private TeacherServiceImplArraylist teacherServiceImplArraylist;
 private StudentService studentService;
 private StudentServiceImplArraylist studentServiceImplArraylist;

 @BeforeEach
 public void setUp() {
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

 Course getCourseObject(Integer id, int teacherId, String name) {
     Course course = new Course();
     if ( id != null) {
         course.setCourseId(id);
     }
     course.setTeacherId(teacherId);
     course.setDescription("course description");
     course.setCourseName(name);
     return course;
 }

 @Test
 public void testAddTeacherToArrayList_Day2() throws SQLException {
     teacherServiceImplArraylist = new TeacherServiceImplArraylist();
     teacherServiceImplArraylist.emptyArrayList();
     Teacher teacher = getTeacherObject(1, "Mary", 5);
     int result = teacherServiceImplArraylist.addTeacher(teacher);
     assertNotNull(result);
     assertEquals(result, 1);
 }

 @Test
 public void testGetAllTeachersSortedByExperienceFromArrayList_Day2() throws SQLException {
     teacherServiceImplArraylist = new TeacherServiceImplArraylist();
     teacherServiceImplArraylist.emptyArrayList();
     Teacher teacher1 = getTeacherObject(1, "John", 5);
     Teacher teacher2 = getTeacherObject(2, "Mary", 3);
     Teacher teacher3 = getTeacherObject(3, "Sophie", 10);

     teacherServiceImplArraylist.addTeacher(teacher1);
     teacherServiceImplArraylist.addTeacher(teacher2);
     teacherServiceImplArraylist.addTeacher(teacher3);

     List<Teacher> result = teacherServiceImplArraylist.getTeacherSortedByExperience();
     assertNotNull(result);
     assertFalse(result.isEmpty());

     assertTrue(result.get(0).getYearsOfExperience() <= result.get(1).getYearsOfExperience());
 }

 @Test
 public void testGetAllTeachers_Day2() throws SQLException {
     teacherServiceImplArraylist = new TeacherServiceImplArraylist();
     teacherServiceImplArraylist.emptyArrayList();
     Teacher teacher1 = getTeacherObject(1, "John", 5);
     Teacher teacher2 = getTeacherObject(2, "Mary", 3);
     Teacher teacher3 = getTeacherObject(3, "Sophie", 10);
     teacherServiceImplArraylist.addTeacher(teacher1);
     teacherServiceImplArraylist.addTeacher(teacher2);
     teacherServiceImplArraylist.addTeacher(teacher3);
     List<Teacher> result = teacherServiceImplArraylist.getAllTeachers();
     assertNotNull(result);
     assertEquals(3, result.size());
 }

 @Test
 public void testGetAllStudentsSortedByName_Day2() throws SQLException, ParseException {
     studentServiceImplArraylist = new StudentServiceImplArraylist();
     studentServiceImplArraylist.emptyArrayList();
     Student student1 = getStudentObject(1,  "Mark");
     Student student2 = getStudentObject(2, "Smith");
     Student student3 = getStudentObject(3, "John");

     studentServiceImplArraylist.addStudent(student1);
     studentServiceImplArraylist.addStudent(student2);
     studentServiceImplArraylist.addStudent(student3);
     List<Student> result = studentServiceImplArraylist.getAllStudentSortedByName();

     assertNotNull(result);
     assertFalse(result.isEmpty());

     // Check if the list is sorted by student full name
     assertTrue(result.get(0).getFullName().equals(student3.getFullName()));
     assertTrue(result.get(1).getFullName().equals(student1.getFullName()));
 }

 @Test
 public void testAddStudentToArrayList_Day2() throws SQLException, ParseException {
     studentServiceImplArraylist = new StudentServiceImplArraylist();
     studentServiceImplArraylist.emptyArrayList();
     Student student1 = getStudentObject(1, "Sazan");
     int result = studentServiceImplArraylist.addStudent(student1);
     assertNotNull(result);
     assertEquals(1, result);
 }

//  @Test
//  public void testGetAllTeachers_Day3() throws Exception {
//      teacherService = new TeacherServiceImplJdbc(new TeacherDAOImpl());
//      Teacher newTeacher = getTeacherObject(null, "John", 10);
//      Teacher teacher2 = getTeacherObject(null, "Mary", 3);
//      teacherService.addTeacher(newTeacher);
//      teacherService.addTeacher(teacher2);

//      List<Teacher> teacher = teacherService.getAllTeachers();

//      assertNotNull(teacher);
//      assertEquals(2, teacher.size()); // Adjust as per your test data
//  }


//  @Test
//  public void testAddTeacher_Day3() throws Exception {
//      teacherService = new TeacherServiceImplJdbc(new TeacherDAOImpl());

//      Teacher newTeacher = getTeacherObject(null, "John", 10);

//      int id = teacherService.addTeacher(newTeacher);

//      Teacher teacher = teacherService.getTeacherById(id);
//      assertNotNull(teacher);
//      assertEquals(newTeacher.getTeacherId(), teacher.getTeacherId());
//      assertEquals(newTeacher.getFullName(), teacher.getFullName());
//  }

//  @Test
//  public void testUpdateTeacher_Day3() throws Exception {
//      teacherService = new TeacherServiceImplJdbc(new TeacherDAOImpl());
//      Teacher newTeacher = getTeacherObject(null, "John", 10);
//      int id = teacherService.addTeacher(newTeacher);

//      Teacher updatedTeachers = getTeacherObject(id, "John Keats", 10);

//      teacherService.updateTeacher(updatedTeachers);

//      Teacher retrievedTeacher = teacherService.getTeacherById(id);

//      assertNotNull(retrievedTeacher);
//      assertEquals(updatedTeachers.getFullName(), retrievedTeacher.getFullName());
//  }

//  @Test
//  public void testDeleteTeacher_Day3() throws Exception {
//      teacherService = new TeacherServiceImplJdbc(new TeacherDAOImpl());
//      Teacher newTeacher = getTeacherObject(null, "John", 10);
//      int id = teacherService.addTeacher(newTeacher);
//      Teacher savedTeacher = teacherService.getTeacherById(id);

//      assertNotNull(savedTeacher);

//      teacherService.deleteTeacher(id);

//      Teacher deletedTeacher = teacherService.getTeacherById(id);

//      assertNull(deletedTeacher);
//  }

//  @Test
//  public void testGetAllTeachersSortedByNameFromArrayList_Day3() throws Exception {
//      teacherService = new TeacherServiceImplJdbc(new TeacherDAOImpl());
//      Teacher newTeacher = getTeacherObject(null, "John", 10);
//      Teacher teacher2 = getTeacherObject(2, "Mary", 3);
//      teacherService.addTeacher(newTeacher);
//      teacherService.addTeacher(teacher2);

//      List<Teacher> sortedTeacher = teacherService.getTeacherSortedByExperience();

//      assertNotNull(sortedTeacher);
//      assertEquals(2, sortedTeacher.size());
//      assertTrue(sortedTeacher.get(0).getYearsOfExperience() <= sortedTeacher.get(1).getYearsOfExperience());
//  }

//  @Test
//  public void testAddStudent_Day3() throws Exception {
//      studentService = new StudentServiceImplJdbc(new StudentDAOImpl());

//      Student student1 = getStudentObject(1, "Sazan");
//      int generatedAccountId = studentService.addStudent(student1);

//      Student retrievedStudent = studentService.getStudentById(generatedAccountId);

//      assertNotNull(retrievedStudent);
//      assertEquals(generatedAccountId, retrievedStudent.getStudentId());
//  }

//  @Test
//  public void testUpdateStudent_Day3() throws Exception {
//      studentService = new StudentServiceImplJdbc(new StudentDAOImpl());

//      Student student = getStudentObject(null, "Sazan");

//      int generatedStudentId = studentService.addStudent(student);
//      student.setStudentId(generatedStudentId);
//      student.setFullName("Sazan Hendrix");
//      studentService.updateStudent(student);

//      Student updatedStudent = studentService.getStudentById(generatedStudentId);

//      assertNotNull(updatedStudent);
//      assertEquals(generatedStudentId, updatedStudent.getStudentId());
//      assertEquals("Sazan Hendrix", updatedStudent.getFullName());
//  }

//  @Test
//  public void testDeleteStudent_Day3() throws Exception {
//      studentService = new StudentServiceImplJdbc(new StudentDAOImpl());

//      Student studentsToAdd = getStudentObject(null, "Sazan");
//      int generatedStudentId = studentService.addStudent(studentsToAdd);

//      assertNotEquals(-1, generatedStudentId);
//      studentService.deleteStudent(generatedStudentId);

//      assertNull(studentService.getStudentById(generatedStudentId));
//  }

//  @Test
//  public void testGetAllStudents_Day3() throws Exception {
//      studentService = new StudentServiceImplJdbc(new StudentDAOImpl());

//      Student students1 = getStudentObject(null, "Sazan");
//      Student students2 = getStudentObject(null, "Stevie");
//      Student students3 = getStudentObject(null, "Valencia");
//      studentService.addStudent(students1);
//      studentService.addStudent(students2);
//      studentService.addStudent(students3);

//      List<Student> allStudent = studentService.getAllStudents();

//      assertNotNull(allStudent);
//      assertTrue(allStudent.size() == 3);
//  }

//  @Test
//  public void testGetAllStudentsSortedByName_Day3() throws Exception {
//      studentService = new StudentServiceImplJdbc(new StudentDAOImpl());

//      List<Student> unsortedStudent = new ArrayList<>();
//      Student students1 = getStudentObject(null, "Sazan");
//      Student students2 = getStudentObject(null, "Amari");
//      unsortedStudent.add(students1);
//      unsortedStudent.add(students2);
//      for (Student student : unsortedStudent) {
//          studentService.addStudent(student);
//      }

//      List<Student> sortedStudents = studentService.getAllStudentSortedByName();

//      assertFalse(sortedStudents.isEmpty());
//      assertTrue(sortedStudents.get(0).getFullName().equals(students2.getFullName()));
//      assertTrue(sortedStudents.get(1).getFullName().equals(students1.getFullName()));
//  }

//  @Test
//  public void testGetAllCoursees_Day3() throws Exception {
//      teacherService = new TeacherServiceImplJdbc(new TeacherDAOImpl());
//      CourseService courseService = new CourseServiceImplJdbc(new CourseDAOImpl());

//      Teacher teacher1 = getTeacherObject(null, "John", 10);
//      int teacherId1 = teacherService.addTeacher(teacher1);

//      Teacher teacher2 = getTeacherObject(null, "Mary", 5);
//      int teacherId2 = teacherService.addTeacher(teacher2);

//      List<Course> coursees = new ArrayList<>();
//      coursees.add(getCourseObject(null, teacherId1, "Derma Course"));
//      coursees.add(getCourseObject(null, teacherId2, "Skin Art"));

//      for (Course course : coursees) {
//          courseService.addCourse(course);
//      }

//      List<Course> retrievedCoursees = courseService.getAllCourses();
//      assertNotNull(retrievedCoursees);
//      assertEquals(retrievedCoursees.size(), 2);
//  }

//  @Test
//  public void testGetCourseById_Day3() throws Exception {
//      teacherService = new TeacherServiceImplJdbc(new TeacherDAOImpl());
//      CourseService courseService = new CourseServiceImplJdbc(new CourseDAOImpl());

//      Teacher teacher1 = getTeacherObject(null, "John", 10);
//      int teacherId1 = teacherService.addTeacher(teacher1);

//      Course course = getCourseObject(null, teacherId1, "Derma Course");
//      int courseId = courseService.addCourse(course);

//      Course retrievedCourse = courseService.getCourseById(courseId);

//      assertNotNull(retrievedCourse);
//      assertEquals(courseId, retrievedCourse.getCourseId());
//  }

//  @Test
//  public void testUpdateCourse_Day3() throws Exception {
//      teacherService = new TeacherServiceImplJdbc(new TeacherDAOImpl());
//      CourseService courseService = new CourseServiceImplJdbc(new CourseDAOImpl());

//      Teacher teacher1 = getTeacherObject(null, "John", 10);
//      int teacherId1 = teacherService.addTeacher(teacher1);

//      Course course = getCourseObject(null, teacherId1, "Derma Course");
//      int courseId = courseService.addCourse(course);

//      course.setCourseId(courseId);
//      course.setCourseName("Derma course AUS");
//      courseService.updateCourse(course);

//      Course updatedCourse = courseService.getCourseById(courseId);
//      assertNotNull(updatedCourse);
//      assertEquals("Derma course AUS", updatedCourse.getCourseName());
//  }

//  @Test
//  public void testDeleteCourse_Day3() throws Exception {
//      teacherService = new TeacherServiceImplJdbc(new TeacherDAOImpl());
//      studentService = new StudentServiceImplJdbc(new StudentDAOImpl());
//      CourseService courseService = new CourseServiceImplJdbc(new CourseDAOImpl());

//      Teacher teacher1 = getTeacherObject(null, "John", 10);
//      int teacherId1 = teacherService.addTeacher(teacher1);

//      Course course = getCourseObject(null, teacherId1, "Derma Course");
//      int courseId = courseService.addCourse(course);

//      assertNotNull(courseId);

//      assertNotEquals(-1, courseId);

//      courseService.deleteCourse(courseId);

//      assertNull(courseService.getCourseById(courseId));
//  }
}
