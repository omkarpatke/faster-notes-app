import React from 'react';
import axios from 'axios';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useNote } from '../../context/note-context';

export default function Login() {
   const navigate = useNavigate();
   const { setIsLogin } = useNote();
    const loginAsGuest = async () => {
      try {
        const response = await axios.post(`/api/auth/login`, {
          email: "adarshbalika@gmail.com",
          password: "adarshBalika123",
        });
        if(response.status === 200){
          setIsLogin(true);
          navigate('/');
        }
        // saving the encodedToken in the localStorage
        localStorage.setItem("token", response.data.encodedToken);
        
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <>
    <div className="login-container">
        <h3 className="login-heading">Account Information</h3>
        <div className="login-card">
            <h2>LogIn</h2>
            <form className="logIn-form">
                <label htmlFor='login-eamil-input' aria-required="true">E-mail address<span>*</span></label>
                <input type="email" name="user-email" id="login-eamil-input"/>

                <label htmlFor='login-password' aria-required="true">Password<span>*</span></label>
                <input type="password" name="login-password" id="login-password"/>

                <button className="forgot-password-link">Forgot your password?</button>

                <button className="login-btn" type="submit"> Login In </button>
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
