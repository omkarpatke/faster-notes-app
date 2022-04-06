import React , { useState } from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function SignUp() {
  const [name , setName] = useState('');
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const [lastName , setLastName] = useState('');

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/auth/signup`, JSON.stringify({
        firstName: "Adarsh",
        lastName: "Balika",
        email: "adarshbalika@gmail.com",
        password: "adarshBalika",
      }));
      console.log(response)
      // saving the encodedToken in the localStorage
      localStorage.setItem("token", response.data.encodedToken);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
    <div className="login-container">
        <h3 className='login-container-heading'>Account Information</h3>
        <div className="login-card">
            <h2>Sign Up</h2>
            <form className="logIn-form">
                <label htmlFor="full-name" aria-required="true">Full Name<span>*</span></label>
                <input type="text" name="ful-name" id="full-name" value={name} onChange={ e => setName(e.target.value)}/>

                <label htmlFor="last-name" aria-required="true"> Last Name<span>*</span></label>
                <input type="text" name="last-name" id="last-name" value={lastName} onChange={ e => setLastName(e.target.value)}/>

                <label htmlFor='login-eamil-input' aria-required="true">E-mail address<span>*</span></label>
                <input type="email" name="user-email" id="login-eamil-input" value={email} onChange={ e => setEmail(e.target.value)}/>

                <label htmlFor="login-password" aria-required="true">Password<span>*</span></label>
                <input type="password" name="login-password" id="login-password" value={password} onChange={ e => setPassword(e.target.value)}/>

                <button className="login-btn" type="submit" onClick={(e) => signupHandler(e)}> Sign Up </button>
            </form>
            <Link to="/login">Already have an Account?</Link>
            <h2>OR</h2>
            <button className="signUp-with-google-btn"><i className="lni lni-google"></i> <span>Sign in with google</span></button>
        </div>
    </div>
    </>
  )
}
