import axios from "axios";
import React from 'react';
import '../../styles/SignUp.css';
import { toast } from "react-toastify"

function SignUp(props) {

  const onSignup = async(e) => {
  e.preventDefault();
  let response = await axios.post(process.env.REACT_APP_SERVER_URL + "/users",
    {
      email: e.target[0].value,
      password: e.target[2].value,
      username: e.target[1].value
    })
  
  if(response?.data?.error) {
    toast.error(response?.data?.error)
  } else {
    toast.success("User has been created", response?.data)
  }
  }
  return (
    <div className="parent" id="signUpPage">
                <h1 className='homeTitle'>Yourshelves</h1>
        <div className='boxBox'>
            <div className='box1'>
                <h2 className='signUpTitle'>Sign Up</h2>   
            </div>
            <form className='box2' onSubmit={onSignup}>
                <input className='signUpInput' type="text" placeholder='email'/>  
                <input className='signUpInput' type="text" placeholder='username'/>  
                <input className='signUpInput' type="text"placeholder='password'/> 
            
                <div className="signUpBottoni">
                <button type="submit"> Sign Up </button>
                <button type="button" className="signUpBottone" onClick={() => props.changeToLogin()}>Login </button>
                 <button className="signUpBottone"> Cancel </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default SignUp