import React, { useState } from 'react';
import './Sidebar.css';
import { NavLink , useNavigate } from 'react-router-dom'
import { useNote } from '../../context/note-context';
import { useToastContext } from '../../context/toastContext';
import {v4 as uuid} from 'uuid';
import { useDispatch } from 'react-redux';
import { addNoteToBackend, editNotes } from '../../store/notesSlice';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


export function Sidebar({showBtn}) {
    const {editNoteId,  isLogin, showForm , setShowForm , title , setTitle, desc , setDesc , isEditNoteForm, setIsEditNoteForm } = useNote();
    const notify = useToastContext();
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const activeStyle = ({isActive}) =>  {
        return {
          fontWeight : isActive ? "600" : "500",
          backgroundColor: isActive ? '#c8c8c8' : '',
        }
    }


    const formats = [
      'header', 'font', 'size',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image', 'video'
    ];

  const modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    }
  };
    
    const createNewNote = () => {
    if(isLogin){
      setShowForm(true);
      setIsEditNoteForm(true);
      setTitle('');
      setDesc('');
     }else{
      notify("Please Login!" , {type:'info'});
      navigate('/login');
     }
    }

    const closeForm = () => {
      window.opacity= 10;
      setShowForm(false);
   }

   const addNote = (e) => {
     e.preventDefault();
      const note = {
        _id: uuid(),
        title,
        desc,
        bgColor: '#0w23',
        time:new Date().toLocaleString(),
      }
      setTitle('');
      setDesc('');
      dispatch(addNoteToBackend(note));
      setTimeout(() => {
        closeForm();
      },200) 
     }

     const editNote = (e) => {
      e.preventDefault();
       setIsEditNoteForm(false);
       const note = {
        title,
        desc,
        bgColor: '#fff',
        time:new Date().toLocaleString(),
      }
      dispatch(editNotes({note , editNoteId}));
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
           
           <ReactQuill
              theme="snow"
              formats={formats}
              modules={modules}
              value={desc}
              onChange={(e) => {
                setDesc(e);
              }}
            />
            {isEditNoteForm 
            ? <button className='add-note-btn' onClick={(e) => addNote(e)}>Add Note</button>
            : <button className='add-note-btn' onClick={(e) => editNote(e)}>Edit Note</button> 
            }  
    </form>

    <div className="sidebar">
      <NavLink to='/' style={activeStyle} className='sidebar-link'><i className="lni lni-home"></i>  Home</NavLink>
      <NavLink to='/archive' style={activeStyle} className='sidebar-link'><i className="lni lni-archive"></i>  Archive</NavLink>
      <NavLink to='/trash' style={activeStyle} className='sidebar-link'><i className="lni lni-trash-can"></i>  Trash</NavLink>
      {showBtn
       ? <button className='create-note-btn' onClick={createNewNote}>Create New Note</button>
       : ''
      }
    </div>
    </>
  )
}

