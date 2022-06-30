import React from 'react';
import './Navbar.css';
import {  NavLink, useNavigate } from 'react-router-dom';
import { useNote } from '../../context/note-context';
import { useToastContext } from '../../context/toastContext';
import { useDispatch } from 'react-redux';
import { removeAllNotes } from '../../store/notesSlice';
import { removeAllArchiveNotes } from '../../store/archiveNoteSlice';


export function Navbar() {
  const { isLogin, setIsLogin , setPinNotes } = useNote();
  const navigate = useNavigate();
  const notify = useToastContext();
  const dispatch = useDispatch();

  const logoutHandler = () => {
     setIsLogin(false);
     dispatch(removeAllNotes());
     dispatch(removeAllArchiveNotes());
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
