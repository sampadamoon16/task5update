import React, {useState, useEffect} from 'react'
import {useParams, Link } from 'react-router-dom'
import axios from 'axios'

function View() {
    const [user, setUser] = useState({});

    const {id} =useParams();

    useEffect(()=>{
        axios.get (`http://localhost:5000/getdata/${id}`)
        .then((res)=> setUser({...res.data[0]}))
    }, [id])
  return (
    <div style={{marginTop:"150px"}}>
       <div className='card'>
        <div className='card-header'>
          <h4 style={{color:"darkgoldenrod"}}>Employee Contact Detail</h4>
        </div>
        <div className='container'>
          <strong>ID: </strong>
          <span>{id}</span>
          <br />
          <br />
          <strong>Name: </strong>
          <span>{user.name}</span>
          <br />
          <br />
          <strong>Department: </strong>
          <span>{user.department}</span>
          <br />
          <br />
          <strong>Company: </strong>
          <span>{user.company}</span>
          <br />
          <br />
          <strong>Location: </strong>
          <span>{user.location}</span>
          <br />
          <br />
          <strong>Salary: </strong>
          <span>{user.salary}</span>
          <br />
          <br />
          <Link to="/">
            <div className="btn btn-edit btn btn-secondary">Go back</div>
          </Link>
        </div>
       </div>
    </div>
  )
}

export default View