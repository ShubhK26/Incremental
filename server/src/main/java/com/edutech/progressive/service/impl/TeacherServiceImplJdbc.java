package com.edutech.progressive.service.impl;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.edutech.progressive.dao.TeacherDAO;
import com.edutech.progressive.entity.Teacher;
import com.edutech.progressive.service.TeacherService;

public class TeacherServiceImplJdbc implements TeacherService {

    private TeacherDAO teacherDAO;

    public TeacherServiceImplJdbc(TeacherDAO teacherDAO)  {
        this.teacherDAO = teacherDAO;
    }

    @Override
    public List<Teacher> getAllTeachers() throws SQLException {
        List<Teacher> teachers = new ArrayList<>();
        try {
            teachers = teacherDAO.getAllTeachers();
        } catch (SQLException e) {
            throw new SQLException("Failed to get all teachers "+e.getMessage());
        }
        return teachers;
    }

    @Override
    public Integer addTeacher(Teacher teacher) throws SQLException {
        Integer teacherId = null;
        try {
            teacherId = teacherDAO.addTeacher(teacher);
        } catch (SQLException e) {
            throw new SQLException("Failed to add teachers "+e.getMessage());
        }
        return teacherId;
    }

    @Override
    public List<Teacher> getTeacherSortedByExperience() throws SQLException {
        List<Teacher> sortedTeachers = new ArrayList<>();
        try {
            sortedTeachers = teacherDAO.getAllTeachers();
            Collections.sort(sortedTeachers);

        } catch (SQLException e) {
            throw new SQLException("Failed to get all teachers sorted by experience"+e.getMessage());
        }
        return sortedTeachers;
    }

    public void updateTeacher(Teacher teacher) throws SQLException {
        try {
            teacherDAO.updateTeacher(teacher);
        } catch (SQLException e) {
            throw new SQLException("Failed to update teachers "+e.getMessage());
        }
    }

    public void deleteTeacher(int teacherId) throws SQLException {
        try {
            teacherDAO.deleteTeacher(teacherId);
        } catch (SQLException e) {
            throw new SQLException("Failed to delete teachers "+e.getMessage());
        }
    }

    public Teacher getTeacherById(int teacherId) throws SQLException {
        Teacher teacher = null;
        try {
            teacher = teacherDAO.getTeacherById(teacherId);
        } catch (SQLException e) {
            throw new SQLException("Failed to get teachers by ID "+e.getMessage());
        }
        return teacher;
    }

}