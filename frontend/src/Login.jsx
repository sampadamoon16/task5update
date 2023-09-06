import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { Link , useParams} from 'react-router-dom';



const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', {
                email,
                password,
            });

            if (response.status === 200) {
                const { id, role } = response.data;
                setMessage(`Logged in as ${role} with ID: ${id}`);
            }
        } catch (error) {
            setMessage('Invalid credentials');
            console.error('Error logging in: ', error);
        }
    };

    const [user, setUser] = useState({});

    const {id} =useParams();

    useEffect(()=>{
        axios.get (`http://localhost:5000/getdata/${id}`)
        .then((res)=> setUser({...res.data[0]}))
    }, [id])



    return (
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <div className='bg-white p-3 rounded w-25'>
            <h2>Login</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                {/* <Link to="/"> */}
                <Button variant="primary" type="submit" className='btn btn-primary w-30 rounded-0'>
                   login as manager
                </Button>
                {/* </Link> */}
                <Link to="/view/:id">
                <Button variant="primary" type="submit" className='btn btn-success w-30 rounded-0 ms-5'>
                   login as employee
                </Button>
                </Link>
            </Form>
            <p>{message}</p>
        </div>
        </div>
    );
};

export default Login;


// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.min.css';
// // import './style.css'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom';

// function Login() {
//         const [] = useState
//         const [email, setEmail] = useState('');
//         const [password, setPassword] = useState('');
//         const [message, setMessage] = useState('');
    
//         const handleSubmit = async (e) => {
//             e.preventDefault();
//             try {
//                 const response = await axios.post('http://localhost:5000/login', {
//                     email,
//                     password,
//                 });
    
//                 if (response.status === 200) {
//                     const { id, role } = response.data;
//                     setMessage(`Logged in as ${role} with ID: ${id}`);
//                 }
//             } catch (error) {
//                 setMessage('Invalid credentials');
//                 console.error('Error logging in: ', error);
//             }
//         };

//     return (
//         <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
//             <div className='bg-white p-3 rounded w-25'>
//                 <div className='text-danger'>
//                     {/* {error && error} */}
//                 </div>
//                 <h2>Login</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className='mb-3'>
//                         <label htmlFor='email'><strong>Email</strong></label>
//                         <input type="text" placeholder='Enter Email' name='email' value={email}
//                             onChange={(e) => setEmail(e.target.value)} className='form-control rounded-0' />
//                     </div>
//                     <div className='mb-3'>
//                         <label htmlFor='email'><strong>Password</strong></label>
//                         <input type="password" placeholder='Enter Password' name='password'
//                             value={password} onChange={(e) => setPassword(e.target.value)} className='form-control rounded-0' />
//                     </div>
//                     <Link to='/view' type='submit' className='btn btn-success w-100 rounded-0'>Log in</Link>
//                     <p>You are agree to your terms and condition</p>
//                     {/* <Link to='/' className='btn btn-info border w-100 bg-info rounded-0'>Login</Link>                  */}
//                 </form>
//             </div>
//         </div>
//     )
// }
// export default Login
