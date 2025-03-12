import React from 'react'
import {Link, useLocation, useNavigate} from "react-router-dom";
import "./Styles/Navbar.css";
import { TiHome } from "react-icons/ti";
import { TiInfoLarge } from "react-icons/ti";
import { RiAdminFill } from "react-icons/ri";
import { TbLogout2 } from "react-icons/tb";

export const Navbar = () => {

    let location = useLocation();
    let navigate = useNavigate();
    const handleLogout = ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('PMTusername')
        navigate("/login");
    }

  return (
    <div>
        <nav className="navbar">
        <div className="navflex">
            
            <div className="nav-comp" id="navbarSupportedContent">
            <Link className="navbar-brand" to="/">FlowUp</Link>
            <ul className="navbar-nav nav-comp">
                <li className="nav-item">
                
                <Link className={`nav-link navLink ${location.pathname==="/"?"active":""}`} aria-current="page" to="/"><TiHome className='iconNav'/>Home</Link>
                </li>
                <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about"><TiInfoLarge className='iconNav' />About</Link>
                </li>
            </ul>
            {!localStorage.getItem('token')
            ? <form className="d-flex" role="search">
                <Link className="btn btn-nav" to="/login" role="button">Login</Link>
                <Link className="btn btn-nav" to="/signup" role="button">Signup</Link>
            </form>
            :
            <div>
            <span className="nav-uname"><RiAdminFill />{localStorage.getItem('PMTusername')}</span>
            <button onClick={handleLogout} className="btn"><TbLogout2 className='iconNav2'/>Logout</button>   
            </div>
            }  
            </div>
        </div>
        </nav>
    </div>
  )
}

export default Navbar