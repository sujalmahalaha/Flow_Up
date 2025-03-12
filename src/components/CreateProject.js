import React, {useEffect, useState, useContext} from 'react'
import projectContext from '../context/project/projectContext';
import SearchAndSelect from './SearchAndSelect';
import { useNavigate } from 'react-router-dom';
import { IoMdCreate } from "react-icons/io";

import "./Styles/CreateProject.css";

const CreateProject = (props) => {
    let navigate = useNavigate();
    const context = useContext(projectContext);
    const {users, fetchUsers} = context;
    const initialAdmin = [];
    const [admin, setAdmin] = useState(initialAdmin)
    const [developers, setDevelopers] = useState(initialAdmin)
    const [projectName, setProjectName] = useState("")
    const [description, setDescription] = useState("")

    const handleOnChange = (e)=>{
      if(e.target.name === "projectName") setProjectName(e.target.value);
      if(e.target.name === "description") setDescription(e.target.value);
    }

    const handleFormSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch("https://flow-up06.onrender.com/api/project/create-project", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
          },
          body: JSON.stringify({projectName, description, admin, developers})
      });
      const json = await response.json()
      console.log(json);
      props.showAlert("Project Created Successfully", "success")
      navigate('/projects');
  }

    useEffect(() => {
      if(users.length === 0) fetchUsers();
    }, [])
    
  return (
        <div className="card">
        <div className=" inline">
          <h1 className='cp-heading'>CREATE NEW PROJECT</h1>
        </div>

        <div className="card-body">  
            <form onSubmit={handleFormSubmit}>
              <div className="input-container border border-1 rounded m-3 p-3">
                <label htmlFor="exampleInputEmail1" className="label">Name of Project</label>
                <input type="text" className="inputcp" name="projectName" value={projectName} onChange={handleOnChange}/>
              </div>
              
              <div className="input-container border border-1 rounded m-3 p-3">
                <label htmlFor="exampleInputEmail1" className="label">Description of Project</label>
                <input type="text" className="inputcp" name="description" value={description} onChange={handleOnChange}/>
              </div>

              <SearchAndSelect nameOfArray={"ADMIN"} buildArray={admin} setBuildArray={setAdmin} />
              <SearchAndSelect nameOfArray={"DEVELOPER"} buildArray={developers} setBuildArray={setDevelopers} />
          
              <button type="submit" className="createbtn"><IoMdCreate className='iconCreate'/>CREATE</button>
            </form>
        </div>
    </div>
  )
}

export default CreateProject