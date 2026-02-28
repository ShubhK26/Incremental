package com.edutech.progressive.service.impl;

import java.text.ParseException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edutech.progressive.entity.Enrollment;
import com.edutech.progressive.exception.EnrollmentAlreadyExistsException;
import com.edutech.progressive.repository.EnrollmentRepository;
import com.edutech.progressive.service.EnrollmentService;

@Service
public class EnrollmentServiceImpl implements EnrollmentService{

    @Autowired
    EnrollmentRepository enrollmentRepository;

    @Override
    public List<Enrollment> getAllEnrollments() throws ParseException{
       return enrollmentRepository.findAll();
    }

    @Override
    public int createEnrollment(Enrollment enrollment) throws Exception {
        List<Enrollment> enrollments = enrollmentRepository.findAll();
        for(Enrollment e: enrollments){
            if(e.getStudent().equals(enrollment.getStudent()) && e.getCourse().equals(enrollment.getCourse())){
                throw new EnrollmentAlreadyExistsException("Enrollment already present");
            }
        }
        Enrollment newEnrollment = enrollmentRepository.save(enrollment);
        return newEnrollment.getEnrollmentId();
    }

    @Override
    public void updateEnrollment(Enrollment enrollment) throws Exception {
        Enrollment updatedEnrollment = enrollmentRepository.findById(enrollment.getEnrollmentId()).orElseThrow(()-> new RuntimeException("Enrollment does not exist"));
        updatedEnrollment.setStudent(enrollment.getStudent());
        updatedEnrollment.setCourse(enrollment.getCourse());
        updatedEnrollment.setEnrollmentDate(enrollment.getEnrollmentDate());
        enrollmentRepository.save(updatedEnrollment);
    }

    @Override
    public Enrollment getEnrollmentById(int enrollmentId)  throws ParseException {
       Enrollment enrollment = enrollmentRepository.findById(enrollmentId).orElseThrow(()-> new RuntimeException("Enrollment does not exist"));
       return enrollment;
    }

    @Override
    public List<Enrollment> getAllEnrollmentsByStudent(int studentId) throws Exception {
        List<Enrollment> enrollments = enrollmentRepository.findAllByStudent_StudentId(studentId);
        return enrollments;
    }

    @Override
    public List<Enrollment> getAllEnrollmentsByCourse(int courseId) throws Exception {
        List<Enrollment> enrollments = enrollmentRepository.findAllByCourse_CourseId(courseId);
        return enrollments;
    }
}