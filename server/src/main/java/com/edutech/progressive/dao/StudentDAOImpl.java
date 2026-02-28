package com.edutech.progressive.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.edutech.progressive.config.DatabaseConnectionManager;
import com.edutech.progressive.entity.Student;

public class StudentDAOImpl implements StudentDAO{

    private Connection connection;

    public StudentDAOImpl() {
        try {
            connection = DatabaseConnectionManager.getConnection();
        } catch (SQLException e) {
            System.out.println("Failed to initialize the Database" + e.getMessage());
        }
    }

    @Override
    public int addStudent(Student student) throws SQLException {
       String query = "INSERT INTO student (full_name, date_of_birth, contact_number, email, address) VALUES (?,?,?,?,?)";
        try (PreparedStatement ps = connection.prepareStatement(query, Statement.RETURN_GENERATED_KEYS)) {
            ps.setString(1, student.getFullName());
            ps.setDate(2, new java.sql.Date(student.getDateOfBirth().getTime()));
            ps.setString(3, student.getContactNumber());
            ps.setString(4, student.getEmail());
            ps.setString(5, student.getAddress());

            int affectedRows = ps.executeUpdate();

            if (affectedRows > 0) {
                ResultSet rs = ps.getGeneratedKeys();
                if (rs.next()) {
                    student.setStudentId(rs.getInt(1));
                    return student.getStudentId();
                }
            }
        } catch (SQLException e) {
            throw new SQLException("Failed to insert the data in the Student table " + e.getMessage());
        }
        return -1;
    }

    @Override
    public Student getStudentById(int studentId) throws SQLException {
        Student student = null;
        String query = "SELECT * FROM student WHERE student_id = ?";
        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setInt(1, studentId);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                student = new Student(rs.getInt(1), rs.getString(2), rs.getDate(3), rs.getString(4), rs.getString(5), rs.getString(6));
            }
        } catch (SQLException e) {
            throw new SQLException("Failed to get student by id from the Student table " + e.getMessage());
        }
        return student;
    }

    @Override
    public void updateStudent(Student student) throws SQLException {
        String query = "UPDATE student SET full_name = ?, date_of_birth = ?, contact_number = ?, email = ?, address = ? WHERE student_id = ?";
        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setString(1, student.getFullName());
            ps.setDate(2,  new java.sql.Date(student.getDateOfBirth().getTime()));
            ps.setString(3, student.getContactNumber());
            ps.setString(4, student.getEmail());
            ps.setString(5, student.getAddress());
            ps.setInt(6, student.getStudentId());
            ps.executeUpdate();
        } catch (SQLException e) {
            throw new SQLException("Failed to update the data in the Student table " + e.getMessage());
        }
    }

    @Override
    public void deleteStudent(int studentId) throws SQLException {
        String query = "DELETE FROM student WHERE student_id = ?";
        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setInt(1, studentId);
            ps.executeUpdate();
        } catch (SQLException e) {
            throw new SQLException("Failed to delete the data from the Student table " + e.getMessage());
        }
    }

    @Override
    public List<Student> getAllStudents() throws SQLException {
        List <Student> students = new ArrayList<>();
        String query = "SELECT * FROM student";
        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ResultSet rs = ps.executeQuery();
            while(rs.next()) {
                students.add(new Student(rs.getInt(1), rs.getString(2), rs.getDate(3), rs.getString(4), rs.getString(5), rs.getString(6)));
            }
        } catch (SQLException e) {
            throw new SQLException("Failed to get all the students from the Student table " + e.getMessage());
        }
        return students;
    }
}