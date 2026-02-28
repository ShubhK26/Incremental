
package com.edutech.progressive.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.edutech.progressive.config.DatabaseConnectionManager;
import com.edutech.progressive.entity.Course;

public class CourseDAOImpl implements CourseDAO {

    private Connection connection;

    public CourseDAOImpl() {
        try {
            connection = DatabaseConnectionManager.getConnection();
        } catch (SQLException e) {
            System.out.println("Failed to initialize the Database" + e.getMessage());
        }
    }

    @Override
    public int addCourse(Course course) throws SQLException {
        String query = "INSERT INTO course (course_name, description, teacher_id) VALUES (?,?,?)";
        try (PreparedStatement ps = connection.prepareStatement(query, Statement.RETURN_GENERATED_KEYS)) {
            ps.setString(1, course.getCourseName());
            ps.setString(2, course.getDescription());
            // ps.setInt(3, course.getTeacherId());

            int affectedRows = ps.executeUpdate();

            if (affectedRows > 0) {
                ResultSet rs = ps.getGeneratedKeys();
                if (rs.next()) {
                    course.setCourseId(rs.getInt(1));
                    return course.getCourseId();
                }
            }
        } catch (SQLException e) {
            throw new SQLException("Failed to insert the data in the Course table " + e.getMessage());
        }
        return -1;
    }

    @Override
    public Course getCourseById(int courseId) throws SQLException {
        Course course = null;
        String query = "SELECT * FROM course WHERE course_id = ?";
        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setInt(1, courseId);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                // course = new Course(rs.getInt(1), rs.getString(2), rs.getString(3), rs.getInt(4));
            }
        } catch (SQLException e) {
            throw new SQLException("Failed to get course by id from the Course table " + e.getMessage());
        }
        return course;
    }

    @Override
    public void updateCourse(Course course) throws SQLException {
        String query = "UPDATE course SET course_name = ?, description = ?, teacher_id = ? WHERE course_id = ?";
        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setString(1, course.getCourseName());
            ps.setString(2, course.getDescription());
            // ps.setInt(3, course.getTeacherId());
            ps.setInt(4, course.getCourseId());
            ps.executeUpdate();
        } catch (SQLException e) {
            throw new SQLException("Failed to update the data in the Course table " + e.getMessage());
        }
    }

    @Override
    public void deleteCourse(int courseId) throws SQLException {
        String query = "DELETE FROM course WHERE course_id = ?";
        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setInt(1, courseId);
            ps.executeUpdate();
        } catch (SQLException e) {
            throw new SQLException("Failed to delete the data in from Course table " + e.getMessage());
        }
    }

    @Override
    public List<Course> getAllCourses() throws SQLException {
        List <Course> courses = new ArrayList<>();
        String query = "SELECT * FROM course";
        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ResultSet rs = ps.executeQuery();
            while(rs.next()) {
                // courses.add(new Course(rs.getInt(1), rs.getString(2), rs.getString(3), rs.getInt(4)));
            }
        } catch (SQLException e) {
            throw new SQLException("Failed to get all the courses from the Course table " + e.getMessage());
        }
        return courses;
    }

}