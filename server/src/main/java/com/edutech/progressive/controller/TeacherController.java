package com.edutech.progressive.controller;

import com.edutech.progressive.dto.TeacherDTO;
import com.edutech.progressive.entity.Teacher;
import com.edutech.progressive.service.impl.TeacherServiceImplJpa;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/teacher")
public class TeacherController {

    @Autowired
    TeacherServiceImplJpa teacherServiceImplJpa;

    @GetMapping
    public ResponseEntity<List<Teacher>> getAllTeachers() {
        try {
            List<Teacher> teacherList = teacherServiceImplJpa.getAllTeachers();
            return new ResponseEntity<>(teacherList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{teacherId}")
    public ResponseEntity<Teacher> getTeacherById(@PathVariable int teacherId) {
        try {
            Teacher teacher = teacherServiceImplJpa.getTeacherById(teacherId);
            return new ResponseEntity<>(teacher, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping
    public ResponseEntity<?> addTeacher(@RequestBody Teacher teacher) {
        try {
            int teacherId = teacherServiceImplJpa.addTeacher(teacher);
            return new ResponseEntity<>(teacherId, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{teacherId}")
    public ResponseEntity<?> updateTeacher(@PathVariable int teacherId, @RequestBody TeacherDTO teacher) {
        try {
            teacher.setTeacherId(teacherId);
            teacherServiceImplJpa.modifyTeacherDetails(teacher);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{teacherId}")
    public ResponseEntity<Void> deleteTeacher(@PathVariable int teacherId) {
        try {
            teacherServiceImplJpa.deleteTeacher(teacherId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/yearsofexperience")
    public ResponseEntity<List<Teacher>> getTeacherSortedByYearsOfExperience() {
        try {
            List<Teacher> teacherList = teacherServiceImplJpa.getTeacherSortedByExperience();
            return new ResponseEntity<>(teacherList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
