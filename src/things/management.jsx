import React, { useState } from 'react';

function DataTable() {
  const [students, setStudents] = useState([
  ]);

  const [filter, setFilter] = useState('');
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleMinDateChange = (event) => {
    setMinDate(event.target.value);
  };

  const handleMaxDateChange = (event) => {
    setMaxDate(event.target.value);
  };

  const handleAddStudent = (event) => {
    event.preventDefault();
    const newStudent = {
      lastName: event.target.lastName.value,
      firstName: event.target.firstName.value,
      course: event.target.course.value,
      birthdate: event.target.birthdate.value,
    };
    setStudents([...students, newStudent]);
    setFilter('');
    setMinDate('');
    setMaxDate('');
  };

  const handleRemoveStudent = (index) => {
    const updatedStudents = [...students];
    updatedStudents.splice(index, 1);
    setStudents(updatedStudents);
  };

  const filteredStudents = students.filter((student) => {
    const fullName = `${student.lastName} ${student.firstName}`;
    const birthdate = new Date(student.birthdate);
    return (
      fullName.toLowerCase().includes(filter.toLowerCase()) &&
      (minDate ? birthdate >= new Date(minDate) : true) &&
      (maxDate ? birthdate <= new Date(maxDate) : true)
    );
  });

  return (
    <div>
      <h1>Student Management System</h1>
      <div>
        <label>Filter:</label>
        <input type="text" value={filter} onChange={handleFilterChange} />
      </div>
      <div>
        <label>Min Date:</label>
        <input type="date" value={minDate} onChange={handleMinDateChange} />
      </div>
      <div>
        <label>Max Date:</label>
        <input type="date" value={maxDate} onChange={handleMaxDateChange} />
      </div>
      <table>
        <thead>
          <tr>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Course</th>
            <th>Birthdate</th>
            <th>Age</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr key={student.birthdate}>
              <td>{student.lastName}</td>
              <td>{student.firstName}</td>
              <td>{student.course}</td>
              <td>{student.birthdate}</td>
              <td>{calculateAge(student.birthdate)}</td>
              <td><button onClick={() => handleRemoveStudent(index)}>Remove</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Add Student</h2>
      <form onSubmit={handleAddStudent}>
        <label>Last Name:</label>
        <input type="text" name="lastName" required />
        <br />
        <label>First Name:</label>
        <input type="text" name="firstName" required />
        <br />
        <label>Course:</label>
        <select name="course" required>
          <option value="IT">IT</option>
          <option value="IS">IS</option>
          <option value="CS">CS</option>
          <option value="DS">DS</option>
        </select>
        <br />
        <label>Birthdate:</label>
        <input type="date" name="birthdate" required />
        <br />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}

function calculateAge(birthdate) {
  const birthYear = new Date(birthdate).getFullYear();
  const currentYear = new Date().getFullYear();
  return currentYear - birthYear;
}

export default DataTable;