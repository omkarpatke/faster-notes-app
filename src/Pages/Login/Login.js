import React , { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useNote } from '../../context/note-context';
import { useToastContext } from '../../context/toastContext';

export default function Login() {
   const navigate = useNavigate();
   const [email , setEmail] = useState();
   const [password , setPassword] = useState();
   const notify = useToastContext();

   const { setIsLogin } = useNote();

   const loginHandler = async(e) => {
     e.preventDefault();
    try {
      const response = await axios.post(`/api/auth/login`, {
        email , password
      });
      if(response.status === 200){
        localStorage.setItem("token", response.data.encodedToken);
        notify('You are Successfully LogIn!' , {type:'info'});
        setIsLogin(true);
        navigate('/');
      }
      
    } catch (error) {
      console.log(error);
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
                <input type="email" name="user-email" id="login-eamil-input" value={email} onChange={e => setEmail(e.target.value)}/>

                <label htmlFor='login-password' aria-required="true">Password<span>*</span></label>
                <input type="password" name="login-password" id="login-password" value={password} onChange={e => setPassword(e.target.value)}/>

                <button className="forgot-password-link">Forgot your password?</button>

                <button className="login-btn" type="submit" onClick={loginHandler}> Login In </button>
            </form>
            <button className="login-btn" onClick={() => loginAsGuest()}> LogIn as Guest</button>
            <h2>OR</h2>
            <button className="signIn-with-google-btn"><i className="lni lni-google"></i> <span className='signInWithGoogleBtnText'>Sign in with google</span></button>

            <p>I Don't Have An Account</p>
            <Link to='/sign-up'>CREATE AN ACCOUNT</Link>
        </div>
    </div>
    </>
  )
}
