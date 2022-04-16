import './NotesPage.css';
import { useNote } from '../../context/note-context';
import axios from 'axios';
import { useArchiveNote } from '../../context/archive-note-context';

export default function NotesPage() {
  const { notes , setNotes , addNoteToBackend ,pinNotes , setPinNotes } = useNote();
  const { addToArchiveNotes } = useArchiveNote();
  const encodedToken = localStorage.getItem('token');

  
   const deleteNote = async(note) => {
        try{ await axios.delete(`/api/notes/${note._id}` , {headers : {authorization : encodedToken}} , {note})}
        catch (err) {
          console.log(err)
        }
   }

   const changeBgColor = (note,e) => {
       setNotes(prev => prev.map( prevNote => prevNote._id === note._id ? { ...note , bgColor: e.target.value } : { ...note , bgColor: '' }))
   }

   const addToPinNotes = (note) => {
     deleteNote(note);
     setPinNotes([...pinNotes , note])
   }

   const unPinnedNote = (note) => {
    addNoteToBackend(note);
    setPinNotes( prev => prev.filter( prevNote => prevNote._id !== note._id ));
  }

   

  return (
    <>
    <div className="notes-container">
        <input className='search-bar' type="search" name="search" id="search" placeholder='Search...' />
        <h3>PINNED</h3>
        <div className="pinned-notes">
          {pinNotes.length === 0  ? "No Pinned Notes" : pinNotes.map((pinNote , index) => (
            <div className="note" key={index}>
            <div className="pinned-icon"><i className="lni lni-pin" style={{fontWeight:'1000'}} onClick={() => unPinnedNote(pinNote)}></i></div>
            <div className="title">{pinNote.title}</div>
            <div className="desc">{pinNote.desc}</div>
            <div className="note-date">{pinNote.time} 
            <span className="note-icons">
                <input type="color" className='bg-input' title='Add Background'/>
                <i className="lni lni-write" title='Edit Note'></i>
                <i onClick={() => addToArchiveNotes(pinNote)} className="lni lni-archive" title='Add to Archive'></i>
                <i className="lni lni-tag" title='Add Label'></i>
                <i onClick={() => deleteNote(pinNote)} className="lni lni-trash-can" title='Remove Note'></i>
            </span>
            </div>
        </div>
          ))}

        </div>
        <h3>OTHERS</h3>
        <div className="other-notes">
        {notes.length === 0 ? "There is no notes" : notes.map((note) => (
          <div className="note" key={note._id} style={{backgroundColor:note.bgColor}}>
          <div className="pinned-icon"><i className="lni lni-pin" onClick={() => addToPinNotes(note)}></i></div>
          <div className="title">{note.title}</div>
          <div className="desc">{note.desc}</div>
          <div className="note-date">{note.time} 
          <span className="note-icons">
              <input type="color" className='bg-input' title='Add Background' onChange={(e) => changeBgColor(note,e)}/>
              <i className="lni lni-write" title='Edit Note'></i>
              <i onClick={() => addToArchiveNotes(note)} className="lni lni-archive" title='Add to Archive'></i>
              <i className="lni lni-tag" title='Add Label'></i>
              <i onClick={() => deleteNote(note)} className="lni lni-trash-can" title='Remove Note'></i>
          </span>
          </div>
      </div>
        ))}

        </div>

    </div>
 
    </>
  )
}
