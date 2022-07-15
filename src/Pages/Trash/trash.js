import React from 'react';
import './trash.css';
import { useToastContext } from '../../context';
import { useSelector , useDispatch } from 'react-redux';
import { deleteFromTrash, setTrashNoteColor } from '../../store/trashNotesSlice';
import { addNoteToBackend } from '../../store/notesSlice';
import { Sidebar } from '../../components';

export function Trash() {
  const { trashNotes } = useSelector(state => state);
  const dispatch = useDispatch();  
  const notify = useToastContext();


  const deleteTrashNote = (note) => {
    dispatch(deleteFromTrash(note));
    notify('Deleted Note Successfully!' , {type:'success'});
  }

  const restoreToMainNotes = note => {
    dispatch(deleteFromTrash(note));
    dispatch(addNoteToBackend(note));
    notify('Restored Note Successfully!' , {type:'success'});
  }

  const changeBgColor = (note,color) => {
    dispatch(setTrashNoteColor({note , color}));   
  }

  
  return (
    <>
     <div className='notepage-container'>
      <Sidebar/>
    <div className="notes-container">
        <h3>Trash</h3>
        <div className="pinned-notes">
          {trashNotes.length === 0 ? "No Trash Notes" : trashNotes.map(note => (
            <div className="note" key={note._id} style={{backgroundColor : note.bgColor}}>
            <div className="title">{note.title}</div>
            <div className="desc" dangerouslySetInnerHTML={{ __html: note.desc}}></div>
            <div className="note-date">{note.time} 
            <span className="note-icons">
                <input type="color" className='bg-input' title='Add Background' onChange={(e) => changeBgColor(note,e.target.value)}/>
                <i onClick={() => restoreToMainNotes(note)} className="lni lni-spinner-arrow" title='Restore Note'></i>
                <i onClick={() => deleteTrashNote(note)} className="lni lni-trash-can" title='Remove Note'></i>
            </span>
            </div>
        </div>
          ))}
          
        </div>
    </div>
    </div>
    </>
  )
}
