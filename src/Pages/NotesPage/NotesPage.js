import React , { useState } from 'react';
import './NotesPage.css';
import PinImg from '../../Images/pin.svg';
import PinLight from '../../Images/pin-light.png';
import {  useNavigate , NavLink } from 'react-router-dom'
import { useNote } from '../../context/note-context';
import { addNoteToBackend } from '../../api-calls/api-calls';
import axios from 'axios';

export default function NotesPage() {
  const navigate = useNavigate();
  const {notes , isLogin} = useNote();
  const [showForm , setShowForm] = useState(false);
  const [title , setTitle] = useState('');
  const [desc , setDesc] = useState('');
  
    const activeStyle = ({isActive}) =>  {
        return {fontWeight : isActive ? "600" : "500"}
    }
    
    const createNewNote = () => {
       setShowForm(true);
       
    }

    const closeForm = () => {
      setShowForm(false);
   }

   const addNote = (e) => {
     e.preventDefault();
     if(isLogin){
      const note = {
        title,
        desc,
        time:new Date().toLocaleString(),
      }
      console.log(note)
      setTitle('');
      setDesc('');
      addNoteToBackend(note);
      setTimeout(() => {
        closeForm();
      },500)
     }else{
         
         navigate('/login');
     }
     
   }


   const deleteNote = async(note) => {
     const encodedToken = localStorage.getItem('token');
        try{ await axios.delete(`/api/notes/${note._id}` , {headers : {authorization : encodedToken}} , {note})}
        catch (err) {
          console.log(err)
        }
   }
   

  return (
    <>
    <div className="notepage-container">

    <form className="add-note-cart" style={{display: showForm ? 'flex' : 'none'}}>
      <div className="close-btn" onClick={closeForm}>X</div>
          <h2 className='form-heading'>Add Note</h2>
           <input className='title-input' value={title} onChange={(e) => setTitle(e.target.value)}  type="text" name="title" id="title" placeholder='Title' />
           <textarea className='note-description-input' value={desc} onChange={(e) => setDesc(e.target.value)} name="note-description" id="note-description" cols="15" rows="5" placeholder='Note Description...'></textarea>
           <button className='add-note-btn' onClick={(e) => addNote(e)}>Add Note</button>
    </form>

    <div className="sidebar">
      <NavLink to='' style={activeStyle} className='sidebar-link'><i className="lni lni-home"></i>  Home</NavLink>
      <NavLink to='/archive' style={activeStyle} className='sidebar-link'><i className="lni lni-archive"></i>  Archive</NavLink>
      <NavLink to='/trash' style={activeStyle} className='sidebar-link'><i className="lni lni-trash-can"></i>  Trash</NavLink>
      <NavLink to='/label' style={activeStyle} className='sidebar-link'><i className="lni lni-tag"></i>  Label</NavLink>
      <NavLink to='/account' style={activeStyle} className='sidebar-link'><i className="lni lni-user"></i>  Account</NavLink>
      <button className='create-note-btn' onClick={createNewNote}>Create New Note</button>
    </div>

    <div className="notes-container">
        <input className='search-bar' type="search" name="search" id="search" placeholder='Search...' />
        <h3>PINNED</h3>
        <div className="pinned-notes">

          <div className="note">
              <div className="pinned-icon"><img className='pin-icon' src={PinImg} alt="pin-tag" /></div>
              <div className="title">Title of the note</div>
              <div className="desc">Body of the Note</div>
              <div className="note-date">Created on 26/12/2021</div>
              <div className="note-icons">
                  <div className="note-icon"><i className="note-icon-paint lni lni-paint-roller"></i></div>
                  <div className="note-icon"><i className="note-icon-archive lni lni-archive"></i></div>
                  <div className="note-icon"><i className="note-icon-label lni lni-tag"></i></div>
                  <div className="note-icon"><i className="note-icon-trash lni lni-trash-can"></i></div>
              </div>
          </div>

        </div>
        <h3>OTHERS</h3>
        <div className="other-notes">
        {notes.length === 0 ? "There is no notes" : notes.map((note , index) => (
          <div className="note" key={index}>
          <div className="pinned-icon"><img className='pin-icon' src={PinLight} alt="pin-tag" /></div>
          <div className="title">{note.title}</div>
          <div className="desc">{note.desc}</div>
          <div className="note-date">{note.time}</div>
          <div className="note-icons">
              <div className="note-icon"><i className="note-icon-paint lni lni-paint-roller"></i></div>
              <div className="note-icon"><i className="note-icon-archive lni lni-archive"></i></div>
              <div className="note-icon"><i className="note-icon-label lni lni-tag"></i></div>
              <div className="note-icon"><i onClick={() => deleteNote(note)} className="note-icon-trash lni lni-trash-can"></i></div>
          </div>
      </div>
        ))}

        </div>

    </div>
    </div>
    </>
  )
}
