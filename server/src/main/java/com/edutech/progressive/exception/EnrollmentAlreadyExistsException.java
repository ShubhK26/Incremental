
package com.edutech.progressive.exception;

public class EnrollmentAlreadyExistsException extends RuntimeException{
    public EnrollmentAlreadyExistsException(String msg){
        super(msg);
    }
}