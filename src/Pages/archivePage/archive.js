import React from 'react';
import './archive.css';
import { useArchiveNote } from '../../context/archive-note-context';
import { useToastContext } from '../../context/toastContext';


export default function Archive() {
  const archiveNotes = useArchiveNote();
  const setArchiveNotes = useArchiveNote();
  const { reStoreArchiveNote , deleteArchiveNote } = useArchiveNote();
  const allArchiveNotes = archiveNotes.archiveNotes;
  const notify = useToastContext();

  const changeBgColor = (e , archiveNote) => {
    setArchiveNotes(prev => prev.filter( note => note._id === archiveNote._id ? {...note , bgColor: e.target.value} : {...note , bgColor: ''}))
  }

  const restoreNote = (note) => {
    reStoreArchiveNote(note);
    notify("Restore To Main Notes" , {type:'success'});
  }

  const deleteNote = (note) => {
    deleteArchiveNote(note);
    notify("Remove Archive Notes" , {type:'success'});
  }
  return (
    <div className="notes-container">
      <input className='search-bar' type="search" name="search" id="search" placeholder='Search...' />
        <h3>Archive</h3>
        <div className="pinned-notes">
          {allArchiveNotes.length === 0 ? "No Archive Notes" : allArchiveNotes.map((archiveNote) => (
             <div className="note" key={archiveNote._id} style={{backgroundColor : archiveNote.bgColor}}>
             <div className="title">{archiveNote.title}</div>
             <div className="desc">{archiveNote.desc}</div>
             <div className="note-date">{archiveNote.time} 
             <span className="note-icons">
                 <input type="color" className='bg-input' title='Add Background' onChange={(e) => changeBgColor(e,archiveNote)} />
                 <i className="lni lni-inbox"  title='Restore Archive Note' onClick={() => restoreNote(archiveNote)}></i>
                 <i className="lni lni-tag" title='Add Label'></i>
                 <i className="lni lni-trash-can" title='Delete Archive Note' onClick={() => deleteNote(archiveNote)}></i>
             </span>
             </div>
         </div>
          ))}
          
        </div>
    </div>
  )
}
