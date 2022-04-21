import React from 'react';
import './trash.css';
import { useToastContext , useNote , useTrashContext } from '../../context';

export function Trash() {
  const { trashState , trashDispatch } = useTrashContext();
  const trashNotes = trashState.trashNotes;
  const notify = useToastContext();
  const { addNoteToBackend } = useNote();

  const deleteTrashNote = (note) => {
    const filteredTrashNotes = [...trashNotes].filter( trashNote => trashNote._id !== note._id );
    trashDispatch({ type: "DELETE_FROM_TRASH", payload: filteredTrashNotes });
    notify('Deleted Note Successfully!' , {type:'success'});
  }

  const restoreToMainNotes = note => {
    const filteredTrashNotes = [...trashNotes].filter( trashNote => trashNote._id !== note._id );
    trashDispatch({ type: "DELETE_FROM_TRASH", payload: filteredTrashNotes });
    addNoteToBackend(note);
    notify('Restored Note Successfully!' , {type:'success'});
  }

  
  return (
    <>
    <div className="notes-container">
    <input className='search-bar' type="search" name="search" id="search" placeholder='Search...' />
        <h3>Trash</h3>
        <div className="pinned-notes">
          {trashNotes.length === 0 ? "No Trash Notes" : trashNotes.map(note => (
            <div className="note" key={note._id}>
            <div className="title">{note.title}</div>
            <div className="desc">{note.desc}</div>
            <div className="note-date">{note.time} 
            <span className="note-icons">
                <input type="color" className='bg-input' title='Add Background'/>
                <i onClick={() => restoreToMainNotes(note)} className="lni lni-spinner-arrow" title='Restore Note'></i>
                <i onClick={() => deleteTrashNote(note)} className="lni lni-trash-can" title='Remove Note'></i>
            </span>
            </div>
        </div>
          ))}
          
        </div>
    </div>
    </>
  )
}
