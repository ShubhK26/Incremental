package com.edutech.progressive.service.impl;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.edutech.progressive.dao.StudentDAO;
import com.edutech.progressive.entity.Student;
import com.edutech.progressive.service.StudentService;

public class StudentServiceImplJdbc implements StudentService {

    private StudentDAO studentDAO;

    public StudentServiceImplJdbc(StudentDAO studentDAO) {
        this.studentDAO = studentDAO;
    }

    @Override
    public List<Student> getAllStudents() throws SQLException {
        List<Student> students = new ArrayList<>();
        try {
            students = studentDAO.getAllStudents();
        } catch (SQLException e) {
            throw new SQLException("Failed to get all students "+e.getMessage());
        }
        return students;
    }

    @Override
    public Integer addStudent(Student student) throws SQLException {
        Integer studentId = null;
        try {
            studentId = studentDAO.addStudent(student);
        } catch (SQLException e) {
            throw new SQLException("Failed to add students " +e.getMessage());
        }
        return studentId;
    }

    @Override
    public List<Student> getAllStudentSortedByName() throws SQLException {
        List<Student> sortedStudents = new ArrayList<>();
        try {
            sortedStudents = studentDAO.getAllStudents();
            Collections.sort(sortedStudents);

        } catch (SQLException e) {
            throw new SQLException("Failed to get all students sorted by name"+e.getMessage());
        }
        return sortedStudents;
    }

    @Override
    public void updateStudent(Student student) throws SQLException {
        try {
            studentDAO.updateStudent(student);
        } catch (SQLException e) {
            throw new SQLException("Failed to update students "+e.getMessage());
        }
    }

    @Override
    public void deleteStudent(int studentId) throws SQLException {
        try {
            studentDAO.deleteStudent(studentId);
        } catch (SQLException e) {
           throw new SQLException("Failed to delete students "+e.getMessage());
        }
    }

    @Override
    public Student getStudentById(int studentId) throws SQLException{
        Student student = null;
        try {
            student = studentDAO.getStudentById(studentId);
        } catch (SQLException e) {
            throw new SQLException("Failed to get students by ID "+e.getMessage());
        }
        return student;
    }
}