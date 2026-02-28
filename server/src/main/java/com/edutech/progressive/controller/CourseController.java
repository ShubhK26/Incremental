package com.edutech.progressive.controller;

import com.edutech.progressive.entity.Course;
import org.springframework.http.ResponseEntity;

import java.util.List;

public class CourseController {
    public ResponseEntity<List<Course>> getAllCourses() {
        return null;
    }

    public ResponseEntity<Course> getCourseById(int courseId) {
        return null;
    }

    public ResponseEntity<Integer> addCourse(Course course) {
        return null;
    }

    public ResponseEntity<Void> updateCourse(int courseId, Course course) {
        return null;
    }

    public ResponseEntity<Void> deleteCourse(int courseId) {
        return null;
    }

    public ResponseEntity<List<Course>> getAllCourseByTeacherId(int teacherId) {
        return null;
    }
}
