package com.edutech.progressive.service;

import com.edutech.progressive.entity.Enrollment;

import java.text.ParseException;
import java.util.List;

public interface EnrollmentService {
    List<Enrollment> getAllEnrollments( ) throws ParseException;

    int createEnrollment(Enrollment enrollment ) throws Exception;

    public void updateEnrollment(Enrollment enrollment ) throws Exception;

    public Enrollment getEnrollmentById(int enrollmentId ) throws Exception;

    public List<Enrollment> getAllEnrollmentsByStudent(int studentId ) throws Exception;

    public List<Enrollment> getAllEnrollmentsByCourse(int courseId ) throws Exception;

}
