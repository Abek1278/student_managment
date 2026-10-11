package com.example.student.controller;

import com.example.student.entity.Student;
import com.example.student.service.StudentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
@CrossOrigin(origins = "*") // Allows React frontend to connect seamlessly
public class StudentController {

    private final StudentService studentService;

    // Constructor injection (Same as Exp 10 Step 13)
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    // 1. POST /students : Add student (Exp 10 Step 13)
    @PostMapping
    public Student addStudent(@RequestBody Student student) {
        return studentService.addStudent(student);
    }

    // 2. GET /students : Get all students
    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    // 3. PUT /students/{id} : Update student
    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable Long id, @RequestBody Student student) {
        return studentService.updateStudent(id, student);
    }

    // 4. DELETE /students/{id} : Delete student
    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return "Student deleted successfully";
    }

    // 5. GET /students/total : Calculate total marks (Exp 10 Step 13 pattern)
    @GetMapping("/total")
    public double getTotalMarks() {
        return studentService.calculateTotalMarks();
    }
}
