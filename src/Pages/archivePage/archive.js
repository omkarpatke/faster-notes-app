import React from 'react';
import './archive.css';
import { useArchiveNote } from '../../context/archive-note-context';


export default function Archive() {
  const archiveNotes = useArchiveNote();
  const { reStoreArchiveNote , deleteArchiveNote } = useArchiveNote();
  const allArchiveNotes = archiveNotes.archiveNotes;
  return (
    <div className="notes-container">
      <input className='search-bar' type="search" name="search" id="search" placeholder='Search...' />
        <h3>Archive</h3>
        <div className="pinned-notes">
          {allArchiveNotes.length === 0 ? "No Archive Notes" : allArchiveNotes.map((archiveNote) => (
             <div className="note" key={archiveNote._id}>
             <div className="title">{archiveNote.title}</div>
             <div className="desc">{archiveNote.desc}</div>
             <div className="note-date">{archiveNote.time} 
             <span className="note-icons">
                 <i className="lni lni-paint-roller" title='Add Background'></i>
                 <i className="lni lni-archive" title='Restore Archive Note' onClick={() => reStoreArchiveNote(archiveNote)}></i>
                 <i className="lni lni-tag" title='Add Label'></i>
                 <i className="lni lni-trash-can" title='Delete Note' onClick={() => deleteArchiveNote(archiveNote)}></i>
             </span>
             </div>
         </div>
          ))}
          
        </div>
    </div>
  )
}
