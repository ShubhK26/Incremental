package com.edutech.progressive.exception;

public class StudentAlreadyExistsException extends RuntimeException{
    public StudentAlreadyExistsException(String msg){
        super(msg);
    }
}