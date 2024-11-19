import axios from "axios";
import React, { useContext } from 'react';
import '../../styles/Login.css';
import { toast } from "react-toastify"
import { AuthContext } from '../../services/AuthContext';
import { useNavigate } from "react-router-dom";

function Login(props) {

    const navigate= useNavigate();
    const {setAuth} = useContext(AuthContext);


    async function onLogin(e) {

        e.preventDefault();
    
        console.log("E", e.target[0].value, e.target[1].value);
    
        if(!e.target[0].value){
          return;
        } 
    
        if(!e.target[1].value){
          return;
        }
    
        let res=await axios.post(process.env.REACT_APP_SERVER_URL + "/users/login",
          {
                username: e.target[0].value,
                password: e.target[1].value
    
          }
    
        )
    
        if(res?.data?.error){
          console.log("error",res.data.error);
        }else if (res?.data?.status === true) {
            setAuth({
            email: res?.data?.email,
            username: res?.data?.username,
            status: res?.data?.status,
          });
        
        
        localStorage.setItem("AuthToken", res?.data?.authToken);
        navigate("/home");
        toast.success("You logged in")
        }
      }
    
  return (
    <div className="parent" id="signUpPage">
            <div>
                <h1 className='homeTitle'>Yourshelves</h1>
            </div>
        <div className='boxBox'>
            <div className='box1'>
                <h2 className='signUpTitle'>Login</h2>   
            </div>
            <form className='box2' onSubmit={onLogin}> 
                <input className='signUpInput' type="text" placeholder='username'/>  
                <input className='signUpInput' type="text"placeholder='password'/> 
            
                <button type="login" onClick={() => props.changeToSignUp()}>SignUp </button>
                <button type="submit"> Login </button>
                <div className="bottoni">
                 <button> Cancel </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login