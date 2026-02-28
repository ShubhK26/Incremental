package com.edutech.progressive.controller;

import com.edutech.progressive.entity.Student;
import org.springframework.http.ResponseEntity;

import java.util.List;

public class StudentController {

    public ResponseEntity<List<Student>> getAllStudents() {
        return null;
    }

    public ResponseEntity<Student> getStudentById(int studentId) {
        return null;
    }

    public ResponseEntity<Integer> addStudent(Student student) {
        return null;
    }

    public ResponseEntity<Void> updateStudent(int studentId, Student student) {
        return null;
    }

    public ResponseEntity<Void> deleteStudent(int studentId) {
        return null;
    }

    public ResponseEntity<List<Student>> getAllStudentFromArrayList() {
        return null;
    }

    public ResponseEntity<Integer> addStudentToArrayList(Student student) {
        return null;
    }

    public ResponseEntity<List<Student>> getAllStudentSortedByNameFromArrayList() {
        return null;
    }
}