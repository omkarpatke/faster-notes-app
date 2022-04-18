import React , { useState } from 'react';
import './SignUp.css';
import { Link , useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useNote } from '../../context/note-context';
import { useToastContext } from '../../context/toastContext';

export default function SignUp() {
  const [name , setName] = useState('');
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const [lastName , setLastName] = useState('');
  const navigate = useNavigate();
  const { setIsLogin } = useNote();
  const notify = useToastContext();

  const signupHandler = async (e) => {
    e.preventDefault();
    if(name && lastName && email && password){
      try {
        const response = await axios.post(`/api/auth/signup`, ({
          firstName: name,
          lastName: lastName,
          email: email,
          password: password,
        }));
        // saving the encodedToken in the localStorage
        if(response.status === 201){
          localStorage.setItem("token", response.data.encodedToken);
          notify('You are Successfully Signup!' , {type:'success'});
          setIsLogin(true);
          navigate('/');
        }
      } catch (error) {
        console.log(error);
      }
    }else{
      alert('Enter Empty Fields');
    }
    
  };
  return (
    <>
    <div className="login-container">
        <h3 className='login-container-heading'>Account Information</h3>
        <div className="login-card">
            <h2>Sign Up</h2>
            <form className="logIn-form">
                <label htmlFor="first-name" aria-required="true">First Name<span>*</span></label>
                <input type="text" name="first-name" id="first-name" value={name} onChange={ e => setName(e.target.value)}/>

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
