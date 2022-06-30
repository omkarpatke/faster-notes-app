import React , { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useNote, useToastContext } from '../../context/index';

export function Login() {
   const navigate = useNavigate();
   const [email , setEmail] = useState();
   const [password , setPassword] = useState();
   const notify = useToastContext();
   const [hidePassword , setHidepassword] = useState(true); 
   const { setIsLogin } = useNote();

   const loginHandler = async(e) => {
     e.preventDefault();
     if(email && password){
      try {
        const response = await axios.post(`/api/auth/login`, {
          email , password
        });
        if(response.status === 200){
          localStorage.setItem("token", response.data.encodedToken);
          notify('You are Successfully LogIn!' , {type:'success'});
          setIsLogin(true);
          navigate('/');
        }
        
      } catch (error) {
        notify("The email you entered is not Registered. Please SignUp!",{type:'warning'});
      }
     }else{
      notify('Enter Empty Fields',{type:'warning'});
    }
  
   }

    const loginAsGuest = () => {
      setEmail('adarshbalika@gmail.com')
      setPassword('adarshBalika123')
    };

  return (
    <>
    <div className="login-container">
        <h3 className="login-heading">Account Information</h3>
        <div className="login-card">
            <h2>LogIn</h2>
            <form className="logIn-form" onSubmit={loginHandler}>
            <label htmlFor='login-eamil-input' aria-required="true">E-mail address<span>*</span></label>
                <input type="email" placeholder='johncena@gmail.com' name="user-email" required id="login-eamil-input" value={email} onChange={ event => setEmail(event.target.value)}/>

                <label htmlFor="login-password" aria-required="true">Password<span>*</span></label>
                <input className='password-input' type={hidePassword ? "password" : 'text'} placeholder='********' name="login-password" required id="login-password" value={password} onChange={ event => setPassword(event.target.value)}/>
                <i className={ hidePassword ? 'bi bi-eye-slash eye-icon' : 'bi bi-eye eye-icon'} id="togglePassword" onClick={() => setHidepassword(prev => !prev)}></i>


                <button className="login-btn" type="submit" onClick={loginHandler}> Login In </button>
            </form>
            <button className="login-btn" type="submit" onClick={loginAsGuest}> Login as Guest </button>
            <p>I Don't Have An Account</p>
            <Link to='/sign-up'>CREATE AN ACCOUNT</Link>
        </div>
    </div>
    </>
  )
}
