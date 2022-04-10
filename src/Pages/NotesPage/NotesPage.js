import React from 'react';
import './NotesPage.css';
import { useNote } from '../../context/note-context';
import axios from 'axios';
import { useArchiveNote } from '../../context/archive-note-context';

export default function NotesPage() {
  const { notes } = useNote();
  const { addToArchiveNotes } = useArchiveNote();
  const encodedToken = localStorage.getItem('token');
  
   const deleteNote = async(note) => {
        try{ await axios.delete(`/api/notes/${note._id}` , {headers : {authorization : encodedToken}} , {note})}
        catch (err) {
          console.log(err)
        }
   }

   

  return (
    <>
    <div className="notes-container">
        <input className='search-bar' type="search" name="search" id="search" placeholder='Search...' />
        <h3>PINNED</h3>
        <div className="pinned-notes">

        <div className="note">
          <div className="pinned-icon"><i className="lni lni-pin"></i></div>
          <div className="title">Title Of the Note</div>
          <div className="desc">Descreption of note</div>
          <div className="note-date"> 12/12/2022 11.30PM
          <span className="note-icons">
              <i className="lni lni-paint-roller"></i>
              <i className="lni lni-archive"></i>
              <i className="lni lni-tag"></i>
              <i className="lni lni-trash-can"></i>
          </span>
          </div>
      </div>

        </div>
        <h3>OTHERS</h3>
        <div className="other-notes">
        {notes.length === 0 ? "There is no notes" : notes.map((note) => (
          <div className="note" key={note._id}>
          <div className="pinned-icon"><i className="lni lni-pin"></i></div>
          <div className="title">{note.title}</div>
          <div className="desc">{note.desc}</div>
          <div className="note-date">{note.time} 
          <span className="note-icons">
              <i className="lni lni-paint-roller"></i>
              <i onClick={() => addToArchiveNotes(note)} className="lni lni-archive"></i>
              <i className="lni lni-tag"></i>
              <i onClick={() => deleteNote(note)} className="lni lni-trash-can"></i>
          </span>
          </div>
      </div>
        ))}

        </div>

    </div>
 
    </>
  )
}
