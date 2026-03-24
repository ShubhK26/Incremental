package com.edutech.progressive.service.impl;

import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Service;

import com.edutech.progressive.entity.Teacher;
import com.edutech.progressive.exception.TeacherAlreadyExistsException;
import com.edutech.progressive.repository.TeacherRepository;
import com.edutech.progressive.service.TeacherService;

@Service
public class TeacherServiceImplJpa implements TeacherService {

    TeacherRepository teacherRepository;

    public TeacherServiceImplJpa(TeacherRepository teacherRepository) {
        this.teacherRepository = teacherRepository;
    }

    @Override
    public List<Teacher> getAllTeachers() throws Exception {
        return teacherRepository.findAll();
    }

    @Override
    public Integer addTeacher(Teacher teacher) throws Exception {
        List<Teacher> teachers = teacherRepository.findAll();
        for (Teacher t : teachers) {
            if (t.getFullName().equals(teacher.getFullName())) {
                throw new TeacherAlreadyExistsException("Teacher already exists");
            }
        }
        Teacher newTeacher = teacherRepository.save(teacher);
        return newTeacher.getTeacherId();
    }

    @Override
    public List<Teacher> getTeacherSortedByExperience() throws Exception {
        List<Teacher> sortedtTeacher = teacherRepository.findAll();
        Collections.sort(sortedtTeacher);
        return sortedtTeacher;
    }

    @Override
    public void updateTeacher(Teacher teacher) throws Exception {
        Teacher updatedTeacher = teacherRepository.findById(teacher.getTeacherId())
                .orElseThrow(() -> new IllegalArgumentException("Teacher does not exist"));
                
        updatedTeacher.setFullName(teacher.getFullName());
        updatedTeacher.setEmail(teacher.getEmail());
        updatedTeacher.setContactNumber(teacher.getContactNumber());
        updatedTeacher.setSubject(teacher.getSubject());
        updatedTeacher.setYearsOfExperience(teacher.getYearsOfExperience());
        teacherRepository.save(updatedTeacher);
    }

    @Override
    public void deleteTeacher(int teacherId) throws Exception {
        Teacher deletedTeacher = teacherRepository.findById(teacherId).orElseThrow();
        if (deletedTeacher != null) {
            teacherRepository.delete(deletedTeacher);
        }
    }

    @Override
    public Teacher getTeacherById(int teacherId) throws Exception {
    return teacherRepository.findByTeacherId(teacherId);
    }

}