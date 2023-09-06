import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify'
import { Button, Form } from 'react-bootstrap';


const initialState = {

    name: "",
    department: "",
    company: "",
    location: "",
    salary: ""
}


function NewUser() {
    const [state, setState] = useState(initialState);

    const { name, department, company, location, salary } = state

    const navigate = useNavigate()

    const { id } = useParams()


    ///////   update data  ///////////
    useEffect(() => {
        axios.get(`http://localhost:5000/getdata/${id}`)
            .then((res) => {
                setState({...res.data[0]                    

                })
            })
              .catch(err =>console.log(err))
    }, [id])

    ///   add New User  ///
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !department || !company || !location || !salary) {
            toast.error("Please provide a value for each input field")
        } else {
            //add new user
            axios.post("http://localhost:5000/update", {
                name,
                department,
                company,
                location,
                salary
            })
                .then(() => {
                    setState(initialState);
                    toast.success("User data updated successfully");
                    navigate("/"); // Move the navigate call inside the axios success block
                })
                .catch((err) => toast.error(err.response.data));
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h3>Add New Employee</h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicId">
                        <Form.Label >Id</Form.Label>
                        <Form.Control type="text" name="id" value={id || ""} onChange={handleInputChange} />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" value={name || ""} onChange={handleInputChange} />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formBasicdepartment">
                        <Form.Label>Department</Form.Label>
                        <Form.Control type="text" name="department" value={department || ""} onChange={handleInputChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicompany">
                        <Form.Label>Company</Form.Label>
                        <Form.Control type="text" name="company" value={company || ""} onChange={handleInputChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasiclocation">
                        <Form.Label>Location</Form.Label>
                        <Form.Control type="text" name="location" value={location || ""} onChange={handleInputChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicsalary">
                        <Form.Label>Salary</Form.Label>
                        <Form.Control type="text" name="salary" value={salary || ""} onChange={handleInputChange} />
                    </Form.Group>

                    <Link to="/">
                        <Form.Control type="submit" value={id ? "update" : "Save"} className='btn btn-info mt-3' />

                        <Form.Control type="button" value="Go back" className='mt-3 btn btn-outline-success' />
                    </Link>
                </Form>
            </div>
        </div>
    )
}

export default NewUser;



