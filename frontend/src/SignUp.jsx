import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap'


const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [hobby, setHobby] = useState('');
  const [role, setRole] = useState('employee'); // Default role
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/signup', {
        firstName,
        lastName,
        gender,
        hobby,
        role
      });
      console.log('User registered successfully');
    } catch (error) {
      setMessage('Invalid credentials');
      console.error('Error registering user: ', error);
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <h2>Sign Up</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>First Name:</Form.Label>
            <Form.Control type="name" placeholder="Enter First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <Form.Text className="text-muted">              
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicSurname">
            <Form.Label> Last Name:</Form.Label>
            <Form.Control type="surname" placeholder="Enter Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <Form.Text className="text-muted">              
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicGender">
            <Form.Label>  Gender:</Form.Label>
            <Form.Control type="gender" placeholder="female or male" value={gender} onChange={(e) => setGender(e.target.value)} />
            <Form.Text className="text-muted">              
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicGender">
            <Form.Label>Hobbies:</Form.Label>
            <Form.Control type="hobby" placeholder="painting" value={hobby} onChange={(e) => setHobby(e.target.value)} />
            <Form.Text className="text-muted">              
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicGender">
            <Form.Label>Role:</Form.Label>
            <Form.Select type="hobby" placeholder="painting" value={role} onChange={(e) => setRole(e.target.value)} >
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
            </Form.Select>
            <Form.Text className="text-muted">              
            </Form.Text>
          </Form.Group>      
         
          <div className='mt-2'>
            <Link to='/login'>
              <Button type="submit" className='btn btn-info w-100 rounded-0'>Sign Up</Button>
              <Button type="submit" className='btn btn-success w-100 rounded-0 mt-3'>Login</Button>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
