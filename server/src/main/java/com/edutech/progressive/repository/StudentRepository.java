package com.edutech.progressive.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edutech.progressive.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Integer> {
    public Student findByStudentId(int studentId);
    public Student findByEmail(String email);
}