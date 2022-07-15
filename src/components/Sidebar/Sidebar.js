import React from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom'
import { useNote } from '../../context/note-context';
import { useToastContext } from '../../context/toastContext';
import {v4 as uuid} from 'uuid';
import { useDispatch } from 'react-redux';
import { addNoteToBackend, editNotes } from '../../store/notesSlice';
import JoditEditor from "jodit-react";


export function Sidebar() {
    const {editNoteId,  isLogin, showForm , labels , setLabels, setShowForm , title , setTitle, desc , setDesc , isEditNoteForm, setIsEditNoteForm } = useNote();
    const notify = useToastContext();
    const dispatch = useDispatch();


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
      setLabels({
        home:false,
        office:false,
        food:false
      });
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
        _id: uuid(),
        title,
        desc,
        labels,
        bgColor: '#0w23',
        time:new Date().toLocaleString(),
      }
      setTitle('');
      setDesc('');
      setLabels({
        home:false,
        office:false,
        food:false
      });
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
        labels,
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
           <h3>Labels</h3>
           <div className="priority">
            <input checked={labels.home} onChange={() => {
              
              setLabels({home:!labels.home,office:false,food:false})}} type="radio" name='label' id="home" />
           <label className='filterLabel' htmlFor="home">Home</label>
            <input checked={labels.office} onChange={() => {
              setLabels({home:false,office:!labels.office,food:false})}} type="radio" name='label' id="office" />
           <label className='filterLabel' htmlFor="office">Office</label>
            <input checked={labels.food} onChange={() => {
             
              setLabels({home:false,office:false,food:!labels.food})}} type="radio" name='label' id="food" />
           <label className='filterLabel' htmlFor="food">Food</label>
        </div>
            <JoditEditor value={desc} onChange={e => setDesc(e)}  placeholder='Note Description...' />
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

