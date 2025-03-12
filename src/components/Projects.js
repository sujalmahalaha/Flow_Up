import React, { useState, useEffect, useContext } from "react";
import ProjectItem from "./ProjectItem";
import { Link, useNavigate } from "react-router-dom";
import projectContext from "../context/project/projectContext";
import "./Styles/Projects.css";
import { BiAddToQueue } from "react-icons/bi";

const Projects = (props) => {
  let navigate = useNavigate();
  const context = useContext(projectContext);
  const { fetchUsers } = context;
  const [projects, setProjects] = useState([]);
  const fetchAllProject = async () => {
    const response = await fetch(
      `https://flow-up06.onrender.com/api/project/get-all-projects`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    setProjects(json);
    //console.log(json)
  };

  useEffect(() => {
    fetchUsers();
    fetchAllProject();
    // eslint-disable-next-line
  }, []);

  const routeChange = () => {
    let path = `/create-project`;
    navigate(path);
  };

  return (
    <>
      <div>
        <h2 className="pro-heading">All projects you are involved in</h2>
        <div className="btnPos">
          <button type="button" className="create-btn" onClick={routeChange}>
          <BiAddToQueue className="createIcon"/><span>Create Project</span>
          </button>
        </div>
        <div className="row">
          {projects.length === 0 ? (
            <div className="para-box">
              <p className="pro-para">
                You are involved with none of the projects
              </p>
            </div>
          ) : (
            projects.map((proj, index) => {
              return (
                <div className="col-md-4" key={index}>
                  <Link key={proj._id} to={`/project/${proj._id}`}>
                    {" "}
                    <ProjectItem project={proj} />{" "}
                  </Link>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Projects;
