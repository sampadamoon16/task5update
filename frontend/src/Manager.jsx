import React, { useEffect, useState } from 'react'
import { Button, Table, Form } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import { Link } from 'react-router-dom'
import {toast} from 'react-toastify'



const Manager = () => {
    const [data, setData] = useState([])

    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/getdata")
        setData(response.data)
    };

    useEffect(() => {
        loadData();
    }, []);

    // const deleteContact = (id) =>{
    //     if(window.confirm("are you sure that you wanted to delete this ID ?")){
    //        axios.delete(`http://localhost:5000/deleteemp/${id}`) 
    //        toast.success("contact delelted sccessfully")
    //        setTimeout(() => loadData(), 500);
    //     }
    // }


    ////     deleted contact    /////
    const deleteContact = (id) => {
        if (window.confirm("Are you sure you want to delete this ID?")) {
            axios.delete(`http://localhost:5000/delete/${id}`)
                .then(() => {
                    toast.success("Contact deleted successfully");
                    loadData(); // Reload data after successful deletion
                })
                .catch((error) => {
                    toast.error("An error occurred while deleting the contact");
                    console.error("Delete error:", error);
                });
        }
    };

    return (
        <>

            
            <Link to="/adduser">
                <Button className='btn btn-secondary mt-3'>Add new User</Button>
            </Link>
            <Table>
                <thead >
                    <tr style={{ backgroundColor: 'green' }}>
                        <th >employeeID</th>
                        <th>Name</th>
                        <th>Department_Name</th>
                        <th>Category_Name</th>
                        <th>Location</th>
                        <th>Salary</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { data.map((item, index) => {
                        return (
                            <tr key={item.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.department}</td>
                                <td>{item.company}</td>
                                <td>{item.location}</td>
                                <td>{item.salary}</td>
                                <td>
                                    <Link to={`/update/${item.id}`}>
                                        <Button className='btn btn-success'>Update</Button>
                                    </Link>
                                    <Button className='btn btn-danger ms-2' onClick={()=>deleteContact(item.id)}>Delete</Button>
                                    <Link to={`/view/${item.id}`}>
                                    <Button className='btn btn-secondary ms-2'>view</Button>
                                    </Link>

                                </td>
                            </tr>
                        )
                    })}

                </tbody>

            </Table>
            <Link to="/signup">
                    <Button>Logout</Button>
            </Link>


        </>
    )
}
export default Manager;