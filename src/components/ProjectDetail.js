import React, {useState, useEffect, useContext} from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import projectContext from '../context/project/projectContext';
import TicketItem from './TicketItem';
import "./Styles/ProjectDetail.css";
import { MdDeleteForever } from "react-icons/md";
import { MdOutlineViewModule } from "react-icons/md";
import { GiSprint } from "react-icons/gi";

const ProjectDetail  = (props) => {

    let navigate = useNavigate();
    const context = useContext(projectContext);
    const {users, fetchUsers, userIdToName} = context;
    const params = useParams();
    const [projectId] = useState(params.projectId)
    const [project, setProject] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);

    const fetchTickets = async()=>{
      const responce = await fetch(`https://flow-up06.onrender.com/api/project/get-all-tickets/${projectId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token' : localStorage.getItem('token')
        }
      });
      const tick = await responce.json();
      setTickets(tick);
      console.log("Ticket Fetched")
    }

    const fetchProject = async()=>{
      const responce = await fetch(`https://flow-up06.onrender.com/api/project/get-project/${projectId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token' : localStorage.getItem('token')
        }
      });
      const proj = await responce.json();

      // changing the date format
      const date = new Date(proj.date);
      proj.date = `Created on: ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

      setProject(proj);
    }

    const fetchCurrentUser = async()=>{
      const responce = await fetch(`https://flow-up06.onrender.com/api/auth/getuser`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token' : localStorage.getItem('token')
        }
      });
      const json = await responce.json();
      setCurrentUser(json._id);
    }
    
    const handleOnClickDeleteProject = async()=>{
      const responce = await fetch(`https://flow-up06.onrender.com/api/project/delete-project`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'auth-token' : localStorage.getItem('token')
        },
        body: JSON.stringify({projectId})
      });
      await responce.json();
      props.showAlert("Project and relevant Tickets Deleted Successfully", "success")
      navigate(`/projects`);
    }

    const handleOnClickModifyProject = ()=>{
      navigate(`/modify-project/${project._id}`);
    }

    const handleOnClickGoToSprint = ()=>{
      navigate(`/project/${project._id}/all-sprint`);
    }

    const handleOnClickGoToKanban = ()=>{
      navigate(`/project/${project._id}/kanban-view`);
    }

    const handleOnClickNewTicket = ()=>{
      navigate(`/project/${project._id}/create-ticket`)
    }

    useEffect(() => {
      //console.log(users.length);
      fetchCurrentUser();
      if(users.length === 0) fetchUsers();
      fetchProject();
      fetchTickets();
      // eslint-disable-next-line
    },[])


  return (
    <div className="container">
      { project.length===0 ?
        <div className="container">NOT ALLOWED</div>
        :
        <>

        <div className="card">
          <div className="card-header inline">
            <h5 className='float-start pro-heading1'>{project.projectName}</h5>
            <button disabled={project.createdBy!==currentUser && !project.admin.includes(currentUser)} className="proDetail_btn btn float-end m-1" onClick={handleOnClickModifyProject}>MODIFY PROJECT</button>
            <button className="proDetail_btn btn float-end m-1" onClick={handleOnClickGoToSprint}><GiSprint className='iconSprint'/>GO TO SPRINT</button>
            <button className="proDetail_btn btn float-end m-1" onClick={handleOnClickGoToKanban}><MdOutlineViewModule className='iconKanban' />KANBAN VIEW</button>
          </div>

          <div className="card-body"> 
            <div className="container border border-1 rounded p-3"> 
            <div className="card-text">
            <h5 className="card-title">Description</h5>
              {project.description}
            </div>
            </div>

            <div className="container border border-1 rounded p-3">
            <h5 className="card-title">Created By</h5>
            <div className="card-text">
            <span className="badge textbg mx-1">{userIdToName(project.createdBy)}</span>
            </div>
            </div>

            <div className="container border border-1 rounded p-3">
            <h5 className="card-title">Admin</h5>
            <div className="card-text">
              {project.admin.map((proj, index)=>{
                return (
                  <span className="badge textbg mx-1" key={proj}>{userIdToName(proj)}</span>)
              })}
            </div>
            </div>
            
            <div className="container border border-1 rounded p-3">
            <h5 className="card-title">Developers</h5>
            <div className="card-text">
              {project.developers.map((proj, index)=>{
                return (
                  <span className="badge textbg mx-1" key={proj}>{userIdToName(proj)}</span>)
              })}
            </div>
            </div>
            
            <div className="container border border-1 rounded p-3">
              <h5 className="card-title">Tickets</h5>
                {
                tickets.length===0
                ?
                <div><p>Tickets does not exist</p></div>
                :
                tickets.map((tick, index)=>{
                  return (
                    <div>
                      <Link key={tick._id}  to={`/ticket/${tick._id}`}> <TicketItem ticket={tick} /> </Link>
                    </div>
                    )
                  })
                }
                <button className="newTicketbtn mx-3" onClick={handleOnClickNewTicket}>New Ticket</button>
            </div>
          </div>

          <div className="card-footer">
            {project.date}          
            <button  disabled={project.createdBy!==currentUser} type="button"  className="deletebtn float-end m-1" data-bs-toggle="modal" data-bs-target="#exampleModal">
              <span className='text'>DELETE</span><span onClick={handleOnClickDeleteProject} className='icon'><MdDeleteForever className='iconDelete' /></span>
            </button>
          </div>
        </div>
      </>
      }
    </div>

  
  )
}

export default ProjectDetail

