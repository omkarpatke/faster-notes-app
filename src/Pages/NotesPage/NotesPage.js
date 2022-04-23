import './NotesPage.css';
import { useArchiveNote, useToastContext, useTrashContext, useNote } from '../../context/index';

export function NotesPage() {
  const { setEditNoteId , notes , setNotes , addNoteToBackend ,pinNotes , setPinNotes , deleteNote , setShowForm , setTitle , setDesc , setIsEditNoteForm } = useNote();
  const  { addToArchiveNotes }  = useArchiveNote();
  const notify = useToastContext();
  const { trashDispatch }  = useTrashContext();

   const changeBgColor = (note,e) => {
       setNotes(prev => prev.map( prevNote => prevNote._id === note._id ? { ...note , bgColor: e.target.value } : { ...note , bgColor: '#fff' }));   
   }

   const addToPinNotes = (note) => {
     deleteNote(note);
     setPinNotes([...pinNotes , note])
   }


   const unPinnedNote = (note) => {
    addNoteToBackend(note);
    setPinNotes( prev => prev.filter( prevNote => prevNote._id !== note._id ));
  }

  const deletePinnedNote = (note) => {
    setPinNotes( prev => prev.filter( prevNote => prevNote._id !== note._id ));
  }

  const addNoteToArchive = (note) => {
    addToArchiveNotes(note);
    notify('Added Note In Archive' , {type:'success'})
  }

  const deleteNoteFromBackend =(note) => {
      trashDispatch({ type: "ADD_TO_TRASH", payload: note });
      deleteNote(note);
      notify('Added Note In Trash!' , {type:'success'})
  }

  const editNote = (note) => {
    setShowForm(true);
    setIsEditNoteForm(false);
    setTitle(note.desc);
    setDesc(note.title);
    setEditNoteId(note._id);
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
              <input type="color" className='bg-input' title='Add Background' onChange={(e) => changeBgColor(note,e)}/>
              <i onClick={() => editNote(note)} className="lni lni-write" title='Edit Note'></i>
              <i onClick={() => addNoteToArchive(note)} className="lni lni-archive" title='Add to Archive'></i>
              <i className="lni lni-tag" title='Add Label'></i>
              <i onClick={() => deleteNoteFromBackend(note)} className="lni lni-trash-can" title='Remove Note'></i>
          </span>
          </div>
      </div>
        ))}

        </div>

    </div>
 
    </>
  )
}
