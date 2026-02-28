package com.edutech.progressive.controller;

import com.edutech.progressive.entity.Enrollment;
import org.springframework.http.ResponseEntity;

import java.util.List;

public class EnrollmentController {

    public ResponseEntity<List<Enrollment>> getAllEnrollments() {
        return null;
    }

    public ResponseEntity<Integer> createEnrollment(Enrollment enrollment) {
        return null;
    }

    public ResponseEntity<Void> updateEnrollment(int enrollmentId, Enrollment enrollment) {
        return null;
    }

    public ResponseEntity<Enrollment> getEnrollmentById(int enrollmentId) {
        return null;
    }

    public ResponseEntity<List<Enrollment>> getAllEnrollmentsByStudent(int studentId) {
        return null;
    }

    public ResponseEntity<List<Enrollment>> getAllEnrollmentsByCourse(int courseId) {
        return null;
    }

}
