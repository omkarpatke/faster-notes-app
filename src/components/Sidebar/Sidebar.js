import React from 'react';
import axios from 'axios';
import './Sidebar.css';
import { NavLink } from 'react-router-dom'
import { useNote } from '../../context/note-context';
import { useToastContext } from '../../context/toastContext';


export function Sidebar() {
    const {editNoteId,  isLogin , addNoteToBackend , showForm , setShowForm , title , setTitle, desc , setDesc , isEditNoteForm, setIsEditNoteForm } = useNote();
    const notify = useToastContext();
    const activeStyle = ({isActive}) =>  {
        return {
          fontWeight : isActive ? "600" : "500",
          backgroundColor: isActive ? '#c8c8c8' : '',
        }
    }
    
    const createNewNote = () => {
    if(isLogin){
      setShowForm(true);
      setIsEditNoteForm(true);
      setTitle('');
      setDesc('');
     }else{
      notify("Please Login!" , {type:'info'});
     }
    }

    const closeForm = () => {
      setShowForm(false);
   }

   const addNote = (e) => {
     e.preventDefault();
      const note = {
        title,
        desc,
        bgColor: '',
        time:new Date().toLocaleString(),
      }
      setTitle('');
      setDesc('');
      addNoteToBackend(note);
      setTimeout(() => {
        closeForm();
      },200) 
     }

     const editNote = async(e) => {
       e.preventDefault();
       setIsEditNoteForm(false);
       const note = {
        title,
        desc,
        bgColor: '',
        time:new Date().toLocaleString(),
      }
       const encodedToken = localStorage.getItem('token');
       await axios({
        method: "post",
        url: `/api/notes/${editNoteId}`,
        headers: { authorization: encodedToken },
        data: {note},
      });
      setTimeout(() => {
        closeForm();
      },100) 
     }
   
  return (
    <>
    <form className="add-note-cart" style={{display: showForm ? 'flex' : 'none'}}>
      <div className="close-btn" onClick={closeForm}>X</div>
           <h2 className='form-heading'>{isEditNoteForm ? 'Add Note' : 'Edit Note'}</h2>
           <input className='title-input' value={title} onChange={(e) => setTitle(e.target.value)}  type="text" name="title" id="title" placeholder='Title' />
           <textarea className='note-description-input' value={desc} onChange={(e) => setDesc(e.target.value)} name="note-description" id="note-description" cols="15" rows="5" placeholder='Note Description...'></textarea>
            {isEditNoteForm 
            ? <button className='add-note-btn' onClick={(e) => addNote(e)}>Add Note</button>
            : <button className='add-note-btn' onClick={(e) => editNote(e)}>Edit Note</button> 
            }  
    </form>

    <div className="sidebar">
      <NavLink to='/' style={activeStyle} className='sidebar-link'><i className="lni lni-home"></i>  Home</NavLink>
      <NavLink to='/archive' style={activeStyle} className='sidebar-link'><i className="lni lni-archive"></i>  Archive</NavLink>
      <NavLink to='/trash' style={activeStyle} className='sidebar-link'><i className="lni lni-trash-can"></i>  Trash</NavLink>
      <button className='create-note-btn' onClick={createNewNote}>Create New Note</button>
    </div>
    </>
  )
}

