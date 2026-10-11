package com.example.student.service;

import com.example.student.entity.Student;
import com.example.student.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    // Constructor injection (Same pattern as Exp 10 Step 12)
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    // 1. Add Student (Exp 10 save method)
    public Student addStudent(Student student) {
        return studentRepository.save(student);
    }

    // 2. Get All Students (Exp 10 findAll method)
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // 3. Update Student
    public Student updateStudent(Long id, Student studentDetails) {
        Student existing = studentRepository.findById(id).orElse(null);
        if (existing != null) {
            existing.setRollNo(studentDetails.getRollNo());
            existing.setName(studentDetails.getName());
            existing.setEmail(studentDetails.getEmail());
            existing.setMarks(studentDetails.getMarks());
            return studentRepository.save(existing);
        }
        return null;
    }

    // 4. Delete Student
    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }

    // 5. Calculate Average Marks (Business logic pattern from Exp 10)
    public double calculateAverageMarks() {
        List<Student> students = studentRepository.findAll();
        if (students.isEmpty()) {
            return 0.0;
        }
        double total = 0;
        for (Student student : students) {
            total = total + student.getMarks();
        }
        double avg = total / students.size();
        return Math.round(avg * 100.0) / 100.0; // round to 2 decimal places
    }

    // Calculate Total Marks
    public double calculateTotalMarks() {
        List<Student> students = studentRepository.findAll();
        double total = 0;
        for (Student student : students) {
            total = total + student.getMarks();
        }
        return total;
    }
}
