package com.example.student.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Direct mapping to Exp 1: rollNo and name
    private int rollNo;
    private String name;

    // Direct mapping to Exp 8: email for validation
    private String email;

    // Direct mapping to Exp 10: numeric marks for calculation
    private double marks;

    // Default Constructor (Exp 1 & Exp 2: no-arg constructor)
    public Student() {
    }

    // Parameterized Constructor (Exp 2: constructor overloading)
    public Student(int rollNo, String name, String email, double marks) {
        this.rollNo = rollNo;
        this.name = name;
        this.email = email;
        this.marks = marks;
    }

    // Getters and Setters (Exp 10 Entity standard)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getRollNo() {
        return rollNo;
    }

    public void setRollNo(int rollNo) {
        this.rollNo = rollNo;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public double getMarks() {
        return marks;
    }

    public void setMarks(double marks) {
        this.marks = marks;
    }
}
