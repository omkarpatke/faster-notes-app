import React from 'react';
import './Navbar.css';
import {  NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <>
    <nav className="navbar">
    <NavLink to="" className="logo">Faster Notes</NavLink>
    <NavLink to='/login' className='link'>Login</NavLink>
    </nav>
    </>
  )
}
