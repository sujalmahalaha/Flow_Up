import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import "./Styles/Login.css"


const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://flow-up06.onrender.com/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            localStorage.setItem('PMTusername', json.name)
            props.showAlert("Login Successfully", "success")
            navigate("/");
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
            <h2 className='heading'>Login to continue with FlowUp</h2>
            <form className='form'  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="input" placeholder='Email' value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="input" placeholder='Password' value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>

                <button type="submit" className="login-button">Submit</button>
            </form>
        </div>
    )
}

export default Login