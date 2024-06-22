import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/authe/users/', {
      ...credentials,
      is_staff: true,
      is_superuser: true
    })
      .then(response => {
        navigate('/login');
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" name="username" value={credentials.username} onChange={handleChange} required />
      </label>
      <br />
      <label>
        First Name:
        <input type="text" name="first_name" value={credentials.first_name} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Last Name:
        <input type="text" name="last_name" value={credentials.last_name} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Email:
        <input type="email" name="email" value={credentials.email} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Password:
        <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
      </label>
      <br />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
