import './NotesPage.css';
import {  useToastContext, useNote } from '../../context/index';
import { useSelector , useDispatch } from 'react-redux';
import { addNoteToArchive } from '../../store/archiveNoteSlice';
import { addNoteToBackend, getFilteredNotes, removeNote, setNoteColor } from '../../store/notesSlice';
import { addToTrash } from '../../store/trashNotesSlice';
import { Sidebar } from '../../components';

export function NotesPage() {
  const { setEditNoteId ,pinNotes , setPinNotes,  setShowForm , setTitle , setDesc , setIsEditNoteForm } = useNote();
  const notify = useToastContext();
  const dispatch = useDispatch();
  
  const { notes } = useSelector(state => state);

 

   const changeBgColor = (note,color) => {
       dispatch(setNoteColor({note , color}));   
   }

   const addToPinNotes = (note) => {
     dispatch(removeNote(note));
     setPinNotes([...pinNotes , note])
   }


   const unPinnedNote = (note) => {
    dispatch(addNoteToBackend(note));
    setPinNotes( prev => prev.filter( prevNote => prevNote._id !== note._id ));
  }

  const deletePinnedNote = (note) => {
    setPinNotes( prev => prev.filter( prevNote => prevNote._id !== note._id ));
  }

  const deleteNoteFromBackend =(note) => {
      dispatch(removeNote(note));
      dispatch(addToTrash(note));
      notify('Added Note In Trash!' , {type:'success'})
  }

  const editNote = (note) => {
    setShowForm(true);
    setIsEditNoteForm(false);
    setTitle(note.title);
    setDesc(note.desc);
    setEditNoteId(note._id);
  }



  return (
    <>
      <div className='notepage-container'>
      <Sidebar/>
    <div className="notes-container">
        <input className='search-bar' type="search" name="search" id="search" placeholder='Search...' onChange={(e) => {
          dispatch(getFilteredNotes(e.target.value));
        }} />
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
                <i onClick={() => deletePinnedNote(pinNote)} className="lni lni-trash-can" title='Remove Note'></i>
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
              <input type="color" className='bg-input' title='Add Background' onChange={(e) => changeBgColor(note,e.target.value)}/>
              <i onClick={() => editNote(note)} className="lni lni-write" title='Edit Note'></i>
              <i onClick={() => {
                dispatch(addNoteToArchive(note));
                dispatch(removeNote(note));
                notify('Added Note In Archive' , {type:'success'});
              }} className="lni lni-archive" title='Add to Archive'></i>
              <i onClick={() => deleteNoteFromBackend(note)} className="lni lni-trash-can" title='Remove Note'></i>
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
