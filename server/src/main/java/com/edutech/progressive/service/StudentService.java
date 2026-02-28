package com.edutech.progressive.service;

import com.edutech.progressive.dto.StudentDTO;
import com.edutech.progressive.entity.Student;

import java.util.List;

public interface StudentService {

    List<Student> getAllStudents();

    Integer addStudent(Student student);

    List<Student> getAllStudentSortedByName();

    default void emptyArrayList() {
    }

    //Do not implement these methods in StudentServiceImplArraylist.java class
    default void updateStudent(Student student) {}

    default void deleteStudent(int studentId) {}

    default Student getStudentById(int studentId) {
        return null;
    }

    //Do not implement these methods in StudentServiceImplArraylist.java and StudentServiceImplJdbc.java class
    //Do not implement in StudentServiceImplJpa.java until Day-13
    default public void modifyStudentDetails(StudentDTO studentDTO) { }
}
