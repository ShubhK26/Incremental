package com.edutech.progressive.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.edutech.progressive.config.DatabaseConnectionManager;
import com.edutech.progressive.entity.Teacher;

public class TeacherDAOImpl implements TeacherDAO{

     private Connection connection;

    public TeacherDAOImpl() {
        try {
            connection = DatabaseConnectionManager.getConnection();
        } catch (SQLException e) {
            System.out.println("Failed to initialize the Database" + e.getMessage());
        }
    }

    @Override
    public int addTeacher(Teacher teacher) throws SQLException {
       String query = "INSERT INTO teacher (full_name, subject, contact_number, email, years_of_experience) VALUES (?,?,?,?,?)";
        try (PreparedStatement ps = connection.prepareStatement(query, Statement.RETURN_GENERATED_KEYS)) {
            ps.setString(1, teacher.getFullName());
            ps.setString(2, teacher.getSubject());
            ps.setString(3, teacher.getContactNumber());
            ps.setString(4, teacher.getEmail());
            ps.setInt(5, teacher.getYearsOfExperience());

            int affectedRows = ps.executeUpdate();

            if (affectedRows > 0) {
                ResultSet rs = ps.getGeneratedKeys();
                if (rs.next()) {
                    teacher.setTeacherId(rs.getInt(1));
                    return teacher.getTeacherId();
                }
            }
        } catch (SQLException e) {
            throw new SQLException("Failed to insert the data in the Teacher table " + e.getMessage());
        }
        return -1;
    }

    @Override
    public Teacher getTeacherById(int teacherId) throws SQLException {
        Teacher teacher = null;
        String query = "SELECT * FROM teacher WHERE teacher_id = ?";
        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setInt(1, teacherId);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                teacher = new Teacher(rs.getInt(1), rs.getString(2), rs.getString(3), rs.getString(4), rs.getString(5), rs.getInt(6));
            }
        } catch (SQLException e) {
            throw new SQLException("Failed to get teacher by id from the Teacher table " + e.getMessage());
        }
        return teacher;
    }

    @Override
    public void updateTeacher(Teacher teacher) throws SQLException {
        String query = "UPDATE teacher SET full_name = ?, subject = ?, contact_number = ?, email = ?, years_of_experience = ? WHERE teacher_id = ?";
        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setString(1, teacher.getFullName());
            ps.setString(2, teacher.getSubject());
            ps.setString(3, teacher.getContactNumber());
            ps.setString(4, teacher.getEmail());
            ps.setInt(5, teacher.getYearsOfExperience());
            ps.setInt(6, teacher.getTeacherId());
            ps.executeUpdate();
        } catch (SQLException e) {
            throw new SQLException("Failed to update the data in the Teacher table " + e.getMessage());
        }
    }

    @Override
    public void deleteTeacher(int teacherId) throws SQLException {
        String query = "DELETE FROM teacher WHERE teacher_id = ?";
        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setInt(1, teacherId);
            ps.executeUpdate();
        } catch (SQLException e) {
            throw new SQLException("Failed to delete the data from the Teacher table " + e.getMessage());
        }
    }

    @Override
    public List<Teacher> getAllTeachers() throws SQLException {
        List <Teacher> teachers = new ArrayList<>();
        String query = "SELECT * FROM teacher";
        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ResultSet rs = ps.executeQuery();
            while(rs.next()) {
                teachers.add(new Teacher(rs.getInt(1), rs.getString(2), rs.getString(3), rs.getString(4), rs.getString(5), rs.getInt(6)));
            }
        } catch (SQLException e) {
            throw new SQLException("Failed to get all the teachers from the Teacher table " + e.getMessage());
        }
        return teachers;
    }
}