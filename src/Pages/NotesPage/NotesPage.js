import React from 'react';
import './NotesPage.css';
import PinImg from '../../Images/pin.svg';
import PinLight from '../../Images/pin-light.png';
import { useNote } from '../../context/note-context';
import axios from 'axios';

export default function NotesPage() {
  const { notes } = useNote();

   const deleteNote = async(note) => {
     const encodedToken = localStorage.getItem('token');
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
              <div className="note-icon" onClick={() => deleteNote(note)}><i className="note-icon-trash lni lni-trash-can"></i></div>
          </div>
      </div>
        ))}

        </div>

    </div>
 
    </>
  )
}
