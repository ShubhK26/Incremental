package com.edutech.progressive.service.impl;

import com.edutech.progressive.dto.StudentDTO;
import com.edutech.progressive.entity.Student;
import com.edutech.progressive.exception.StudentAlreadyExistsException;
import com.edutech.progressive.repository.AttendanceRepository;
import com.edutech.progressive.repository.EnrollmentRepository;
import com.edutech.progressive.repository.StudentRepository;
import com.edutech.progressive.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class StudentServiceImplJpa implements StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    EnrollmentRepository enrollmentRepository;

    @Autowired
    AttendanceRepository attendanceRepository;

    // @Autowired
    public StudentServiceImplJpa(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public List<Student> getAllStudents() throws Exception {
        return studentRepository.findAll();
    }

    @Override
    public Integer addStudent(Student student) throws Exception {
        Student existingStudent = studentRepository.findByEmail(student.getEmail());
        if (existingStudent != null) {
            throw new StudentAlreadyExistsException("Student with this email already exists, Email: " + student.getEmail());
        }
        return studentRepository.save(student).getStudentId();
    }

    @Override
    public List<Student> getAllStudentSortedByName() throws Exception {
        List<Student> studentList = studentRepository.findAll();
        studentList.sort(Comparator.comparing(Student::getFullName));
        return studentList;
    }

    @Override
    public void updateStudent(Student student) throws Exception {
        Student existingStudent = studentRepository.findByEmail(student.getEmail());
        if (existingStudent != null && existingStudent.getStudentId() != student.getStudentId()) {
            throw new StudentAlreadyExistsException("Student with this email already exists, Email: " + student.getEmail());
        }
        studentRepository.save(student);
    }

    @Override
    public void deleteStudent(int studentId) throws Exception {
        attendanceRepository.deleteByStudentId(studentId);
        enrollmentRepository.deleteByStudentId(studentId);
        studentRepository.deleteById(studentId);
    }

    @Override
    public Student getStudentById(int studentId) throws Exception {
        // return studentRepository.findByStudentId(studentId);
        return studentRepository.findById(studentId).orElse(null);
    }

    @Override
    public void modifyStudentDetails(StudentDTO studentDTO) {
    }
}
