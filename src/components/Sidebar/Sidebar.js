import React , {useState} from 'react';
import './Sidebar.css';
import {  useNavigate , NavLink } from 'react-router-dom'
import { useNote } from '../../context/note-context';
import { useToastContext } from '../../context/toastContext';


export default function Sidebar() {
    const navigate = useNavigate();
    const { isLogin , addNoteToBackend } = useNote();
    const [showForm , setShowForm] = useState(false);
    const [title , setTitle] = useState('');
    const [desc , setDesc] = useState('');
    const notify = useToastContext();

    const activeStyle = ({isActive}) =>  {
        return {fontWeight : isActive ? "600" : "500"}
    }
    
    const createNewNote = () => isLogin ? setShowForm(true) : notify("Please Login!" , {type:'info'});
    

    const closeForm = () => {
      setShowForm(false);
   }

   const addNote = (e) => {
     e.preventDefault();
     if(isLogin){
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
     }else{
         closeForm();
         navigate('/login');
     } 
   }
  return (
    <>
    <form className="add-note-cart" style={{display: showForm ? 'flex' : 'none'}}>
      <div className="close-btn" onClick={closeForm}>X</div>
          <h2 className='form-heading'>Add Note</h2>
           <input className='title-input' value={title} onChange={(e) => setTitle(e.target.value)}  type="text" name="title" id="title" placeholder='Title' />
           <textarea className='note-description-input' value={desc} onChange={(e) => setDesc(e.target.value)} name="note-description" id="note-description" cols="15" rows="5" placeholder='Note Description...'></textarea>
           <button className='add-note-btn' onClick={(e) => addNote(e)}>Add Note</button>
    </form>

    <div className="sidebar">
      <NavLink to='/' style={activeStyle} className='sidebar-link'><i className="lni lni-home"></i>  Home</NavLink>
      <NavLink to='/archive' style={activeStyle} className='sidebar-link'><i className="lni lni-archive"></i>  Archive</NavLink>
      <NavLink to='/trash' style={activeStyle} className='sidebar-link'><i className="lni lni-trash-can"></i>  Trash</NavLink>
      <NavLink to='/label' style={activeStyle} className='sidebar-link'><i className="lni lni-tag"></i>  Label</NavLink>
      <NavLink to='/account' style={activeStyle} className='sidebar-link'><i className="lni lni-user"></i>  Account</NavLink>
      <button className='create-note-btn' onClick={createNewNote}>Create New Note</button>
    </div>
    </>
  )
}
