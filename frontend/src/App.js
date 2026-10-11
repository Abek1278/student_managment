import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State for student list
  const [students, setStudents] = useState([]);

  // Form input states (Direct mapping to Exp 1 rollNo & name, Exp 8 email, Exp 10 marks)
  const [rollNo, setRollNo] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [marks, setMarks] = useState('');

  // State to track if editing an existing student (null means adding new)
  const [editId, setEditId] = useState(null);

  // State to display calculated total marks (Exp 10 calculateTotal feature)
  const [totalMarks, setTotalMarks] = useState(null);

  // Backend API URL (Matches Exp 10 @RequestMapping("/students"))
  const API_URL = 'http://localhost:8080/students';

  // Fetch all students on page load
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error('Error fetching students:', error));
  };

  // Experiment 8: Email validation logic (checking presence of '@' and '.')
  const validateEmail = (emailInput) => {
    if (emailInput.indexOf('@') === -1 || emailInput.indexOf('.') === -1) {
      alert("Invalid Email! Email must contain '@' and '.' characters. Please re-enter.");
      return false;
    }
    return true;
  };

  // Form Submit Handler (Add or Update)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check empty inputs
    if (!rollNo || !name || !email || !marks) {
      alert('Please fill all the fields!');
      return;
    }

    // Experiment 8 Email Validation Check
    if (!validateEmail(email)) {
      return;
    }

    const studentData = {
      rollNo: parseInt(rollNo),
      name: name,
      email: email,
      marks: parseFloat(marks)
    };

    if (editId === null) {
      // POST /students (Exp 10 addExpense pattern)
      fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData),
      })
        .then(() => {
          alert('Student added successfully!');
          resetForm();
          fetchStudents();
        })
        .catch((error) => console.error('Error adding student:', error));
    } else {
      // PUT /students/{id}
      fetch(`${API_URL}/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData),
      })
        .then(() => {
          alert('Student updated successfully!');
          resetForm();
          fetchStudents();
        })
        .catch((error) => console.error('Error updating student:', error));
    }
  };

  // Select student to edit
  const handleEdit = (student) => {
    setEditId(student.id);
    setRollNo(student.rollNo);
    setName(student.name);
    setEmail(student.email);
    setMarks(student.marks);
  };

  // Delete student by ID
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      })
        .then(() => {
          alert('Student deleted successfully!');
          fetchStudents();
        })
        .catch((error) => console.error('Error deleting student:', error));
    }
  };

  // Calculate Total Marks (Exp 10 calculateTotal pattern: calls GET /students/total)
  const handleCalculateTotal = () => {
    fetch(`${API_URL}/total`)
      .then((response) => response.json())
      .then((data) => setTotalMarks(data))
      .catch((error) => console.error('Error calculating total:', error));
  };

  // Reset Form
  const resetForm = () => {
    setRollNo('');
    setName('');
    setEmail('');
    setMarks('');
    setEditId(null);
  };

  return (
    <div className="container">
      <h1>Student Management System</h1>

      {/* FORM CARD (Add / Update) */}
      <div className="card">
        <h2>{editId ? 'Update Student Record' : 'Add New Student'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Roll Number:</label>
            <input
              type="number"
              placeholder="e.g. 101"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Student Name:</label>
            <input
              type="text"
              placeholder="e.g. Rahul Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Email Address (Exp 8 Validation):</label>
            <input
              type="text"
              placeholder="e.g. rahul@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Marks:</label>
            <input
              type="number"
              step="0.1"
              placeholder="e.g. 85.5"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
            />
          </div>

          <div className="btn-group">
            <button type="submit" className="btn btn-primary">
              {editId ? 'Update Student' : 'Add Student'}
            </button>
            {editId && (
              <button type="button" className="btn btn-secondary" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* TABLE CARD (Display / Actions) */}
      <div className="card">
        <h2>Student Records</h2>
        {students.length === 0 ? (
          <p className="no-data">No student records found. Add a student above!</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Roll No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Marks</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.rollNo}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.marks}</td>
                  <td>
                    <button
                      className="btn btn-edit"
                      onClick={() => handleEdit(student)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDelete(student.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Calculation Section from Exp 10 */}
        <div style={{ marginTop: '20px' }}>
          <button className="btn btn-calc" onClick={handleCalculateTotal}>
            Calculate Total Marks
          </button>
          {totalMarks !== null && (
            <div className="total-box">
              <h3>Total Marks of All Students: ₹{totalMarks} / {totalMarks} pts</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
