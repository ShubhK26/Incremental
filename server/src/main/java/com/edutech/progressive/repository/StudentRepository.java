package com.edutech.progressive.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.edutech.progressive.entity.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer> {
    // public Student findByStudentId(int studentId);
    public Student findByEmail(String email);
}