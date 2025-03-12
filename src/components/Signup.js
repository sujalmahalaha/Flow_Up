import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import "./Styles/Login.css"

const Signup = (props) => {
  
  const [credentials, setCredentials] = useState({name:"", email: "", password: "", cpassword:""}) 
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://flow-up06.onrender.com/api/auth/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            localStorage.setItem('PMTusername', credentials.name);
            navigate("/");
            props.showAlert("Account Created Successfully", "success")
        }
        else{
            props.showAlert("Invalid Credentials", "danger")
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

  return (
    <div className='login-container'>
          <h2 className='heading'>Create an account to use FlowUp</h2>
        <form className='form' onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" placeholder='Your Name' className="input" onChange={onChange} name="name" id="name" aria-describedby="emailHelp"/>
            </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" placeholder='Type Email' className="input" onChange={onChange} name="email" id="email" aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" placeholder='Password' className="input" onChange={onChange} required minLength={5} name="password" id="password"/>
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" placeholder='Confirm Password' className="input" onChange={onChange} required minLength={5} name="cpassword" id="cpassword"/>
          </div>
          <button type="submit" className="login-button">Submit</button>
        </form>
      </div>
  )
}

export default Signup