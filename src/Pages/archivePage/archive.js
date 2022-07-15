import React from 'react';
import './archive.css';
import { useToastContext } from '../../context/index';
import { useSelector , useDispatch } from 'react-redux';
import { removeArchiveNote, setNoteColor } from '../../store/archiveNoteSlice';
import { addNoteToBackend } from '../../store/notesSlice';
import { Sidebar } from '../../components';

export function Archive() {
  const { archiveNotes } = useSelector(state => state);
  const dispatch = useDispatch();

  const notify = useToastContext();

  const changeBgColor = (note,color) => {
    dispatch(setNoteColor({note , color}));   
}


  return (
    <div className='notepage-container'>
      <Sidebar/>
    <div className="notes-container">
        <h3>Archive</h3>
        <div className="pinned-notes">
          {archiveNotes.length === 0 ? "No Archive Notes" : archiveNotes.map((archiveNote) => (
             <div className="note" key={archiveNote._id} style={{backgroundColor : archiveNote.bgColor}}>
             <div className="title">{archiveNote.title}</div>
             <div className="desc" dangerouslySetInnerHTML={{ __html: archiveNote.desc}}></div>
             <div className="note-date">{archiveNote.time} 
             <span className="note-icons">
                 <input type="color" className='bg-input' title='Add Background' onChange={(e) => changeBgColor(archiveNote,e.target.value)} />
                 <i className="lni lni-inbox"  title='Restore Archive Note' onClick={() => {
                   dispatch(removeArchiveNote(archiveNote));
                   dispatch(addNoteToBackend(archiveNote));
                   notify("Restore To Main Notes" , {type:'success'});
                 }}></i>
                 <i className="lni lni-trash-can" title='Delete Archive Note' onClick={() => {
                  dispatch(removeArchiveNote(archiveNote));
                  notify("Remove Archive Notes" , {type:'success'});
                 }}></i>
             </span>
             </div>
         </div>
          ))}
          
        </div>
    </div>
    </div>
  )
}
