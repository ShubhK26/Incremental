package com.edutech.progressive.service.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.springframework.stereotype.Service;

import com.edutech.progressive.entity.Student;
import com.edutech.progressive.service.StudentService;

@Service
public class StudentServiceImplArraylist implements StudentService {

    private static List<Student> studentList = new ArrayList<>();

    @Override
    public List<Student> getAllStudents() {
        return studentList;
    }

    @Override
    public Integer addStudent(Student student) {
        studentList.add(student);
        return studentList.size();
    }

    @Override
    public List<Student> getAllStudentSortedByName() {
        List<Student> sortedByNameList = new ArrayList<>(studentList);
        Collections.sort(sortedByNameList);
        return sortedByNameList;
    }

    @Override
    public void emptyArrayList() {
        studentList.clear();
    }

    public Comparator nameComparator = new Comparator<Student>() {

        @Override
        public int compare(Student s1, Student s2) {
            return s1.getFullName().compareTo(s2.getFullName());
        }

    };

}