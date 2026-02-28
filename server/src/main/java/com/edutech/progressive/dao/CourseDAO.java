package com.edutech.progressive.dao;

import com.edutech.progressive.entity.Course;

import java.util.List;

public interface CourseDAO {
    int addCourse(Course course);
    Course getCourseById(int courseId);
    void updateCourse(Course course);
    void deleteCourse(int courseId);
    List<Course> getAllCourses();
}