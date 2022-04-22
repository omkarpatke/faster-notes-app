import React from 'react';
import './Navbar.css';
import {  NavLink, useNavigate } from 'react-router-dom';
import { useNote } from '../../context/note-context';
import { useToastContext } from '../../context/toastContext';


export function Navbar() {
  const { isLogin, setIsLogin , setPinNotes } = useNote();
  const navigate = useNavigate();
  const notify = useToastContext();

  const logoutHandler = () => {
     setIsLogin(false);
     notify('You are Successfully Logout!' , {type:'success'});
     setPinNotes([]);
     navigate('/');
     localStorage.clear();
  }

  return (
    <>
    <nav className="navbar">
    <NavLink to="" className="logo">Faster Notes</NavLink>
    {
    !isLogin ? <NavLink to='/login' className='link'>Login</NavLink> : <div className='link logout-btn' onClick={logoutHandler}>Logout</div>}
    </nav>
    </>
  )
}
