import './NotesPage.css';
import { useState , useEffect } from 'react';
import {  useToastContext, useNote } from '../../context/index';
import { useSelector , useDispatch } from 'react-redux';
import { addNoteToArchive } from '../../store/archiveNoteSlice';
import { addNoteToBackend, removeNote, setNoteColor } from '../../store/notesSlice';
import { addToTrash } from '../../store/trashNotesSlice';
import { Sidebar } from '../../components';

export function NotesPage() {
  const { setEditNoteId, setShowForm , setTitle , setDesc , setIsEditNoteForm } = useNote();
  const notify = useToastContext();
  const dispatch = useDispatch();
  const [filteredNotes , setFilteredNotes] = useState([]);
  const { notes } = useSelector(state => state);
  const [pinNotes , setPinNotes] = useState([]);

  

  function addFilteredNotes(items){
    console.log(items);
    setFilteredNotes(items);
  }

  useEffect(() => {
    addFilteredNotes(notes);
  },[notes]);

 

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

  const inputHandler = (e) => {
    if(e.target.value.length > 0){
     setFilteredNotes(prev => prev.filter(note => note.title.includes(e.target.value)));
    }else{
      setFilteredNotes(notes);
    }
  }



  return (
    <>
      <div className='notepage-container'>
      <Sidebar/>
    <div className="notes-container">
        <input className='search-bar' type="search" name="search" id="search" placeholder='Search...' onChange={(e) => inputHandler(e)} />
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
        {filteredNotes.length === 0 ? "There is no notes" : filteredNotes.map((note) => (
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
