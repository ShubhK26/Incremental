package com.edutech.progressive.dao;

import com.edutech.progressive.entity.Student;

import java.util.List;

public interface StudentDAO {
    int addStudent(Student student);
    Student getStudentById(int studentId);
    void updateStudent (Student student);
    void deleteStudent (int studentId);
    List<Student> getAllStudents();
}