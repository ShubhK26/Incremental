package com.edutech.progressive.service;

import com.edutech.progressive.entity.Course;

import java.util.List;

public interface CourseService {

    public List<Course> getAllCourses();

    public Course getCourseById(int courseId);

    public Integer addCourse(Course course);

    public void updateCourse(Course course);

    public void deleteCourse(int courseId);

    //Do not implement these methods in CourseServiceImplJdbc.java class
    default public List<Course> getAllCourseByTeacherId(int teacherId) { return null; }
}
