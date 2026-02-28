package com.edutech.progressive.service.impl;

import java.util.ArrayList;
import java.util.List;

import com.edutech.progressive.dao.CourseDAO;
import com.edutech.progressive.entity.Course;
import com.edutech.progressive.service.CourseService;

public class CourseServiceImplJdbc  implements CourseService{

    private CourseDAO courseDAO;

    public CourseServiceImplJdbc(CourseDAO courseDAO){
        this.courseDAO = courseDAO;
    }

    @Override
    public List<Course> getAllCourses() {
        List<Course> courses = new ArrayList<>();
        try {
            courses = courseDAO.getAllCourses();
        } catch (Exception e) {
            System.out.println("Failed to gell all the courses "+e.getMessage());
        }
        return courses;
    }

    @Override
    public Course getCourseById(int courseId) {
        Course course = null;
        try {
            course = courseDAO.getCourseById(courseId);
        } catch (Exception e) {
            System.out.println("Failed to gell the course by ID "+e.getMessage());
        }
        return course;
    }

    @Override
    public Integer addCourse(Course course) {
        Integer courseId = null;
        try {
            courseId = courseDAO.addCourse(course);
        } catch (Exception e) {
            System.out.println("Failed to add the course "+e.getMessage());
        }
        return courseId;
    }

    @Override
    public void updateCourse(Course course) {
        try {
            courseDAO.updateCourse(course);
        } catch (Exception e) {
            System.out.println("Failed to update course "+e.getMessage());
        }
    }

    @Override
    public void deleteCourse(int courseId) {
        try {
            courseDAO.deleteCourse(courseId);
        } catch (Exception e) {
            System.out.println("Failed to delete course "+e.getMessage());
        }
    }

}