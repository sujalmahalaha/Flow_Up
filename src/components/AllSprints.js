import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import projectContext from '../context/project/projectContext';
import SprintItem from './SprintItem';
import "./Styles/Sprint.css";
import { BiAddToQueue } from "react-icons/bi";

const AllSprints = (props) => {
    
    const params = useParams();
    let navigate = useNavigate(); 
    const context = useContext(projectContext);
    const {fetchUsers} = context;
    const [projectId] = useState(params.projectId)
    const [sprints, setSprints] = useState([]);
// http://localhost:5000
    const fetchAllSprints = async()=>{
      const response = await fetch(`https://flow-up06.onrender.com/api/sprint/all-sprint/${projectId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token' : localStorage.getItem('token')
        }
      });
      const json = await response.json();
      setSprints(json)
      console.log(json)
    }

    const routeChange = () =>{ 
      let path = `/project/${projectId}/create-sprint`; 
      navigate(path);
    }

    useEffect(() => {
      fetchAllSprints();
      // eslint-disable-next-line
    },[])

  return (
    <>
      <div className="container">
        <h2 className="sp-heading">All Sprints</h2>
        <div className="d-flex justify-content-center">
        <button type="button" className="create-btn" onClick={routeChange}><BiAddToQueue className="createIcon"/>CREATE SPRINT</button>
      </div>
        <div className="row">
          {
            sprints.length===0
            ?
            <div><p>NO SPRINTS CREATED</p></div>
            :
            Object.values(sprints).map((spr, index)=>{
              return (<div className="" key={index}>
                <Link key={spr._id} to={`/project/${projectId}/sprint/${spr._id}`}> <SprintItem sprint={spr} /> </Link>
              </div>)
            })
          }
        </div>
      </div>

      
    </>
  )
}

export default AllSprints