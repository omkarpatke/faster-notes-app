import './NotesPage.css';
import { useState , useEffect } from 'react';
import {  useToastContext, useNote } from '../../context/index';
import { useSelector , useDispatch } from 'react-redux';
import { addNoteToArchive } from '../../store/archiveNoteSlice';
import { addNoteToBackend, removeNote, setNoteColor } from '../../store/notesSlice';
import { addToTrash } from '../../store/trashNotesSlice';
import { Sidebar } from '../../components';

export function NotesPage() {
  const { setEditNoteId, setShowForm , setTitle ,setLabels, setDesc , setIsEditNoteForm } = useNote();
  const notify = useToastContext();
  const dispatch = useDispatch();
  const [filteredNotes , setFilteredNotes] = useState([]);
  const { notes } = useSelector(state => state);
  const [pinNotes , setPinNotes] = useState([]);
  const [toggle , setToggle] = useState(false);
  const [filter , setFilter] = useState({
    home:false,
    office:false,
    food:false,
    latest:true,
    old:false,
  });


  useEffect(() => {
    const sortByDate = (allNotes, latest) => {
      let sortedNotes;
      if (latest) {
        return notes;
      } else {
         sortedNotes = allNotes.slice().sort((a,b) => new Date(a.time) - new Date(b.time));
        return sortedNotes;
      }
    };
  
    const filterByLabel = (allNotes, label) => {
      const { home, food, office } = label;
      if (food && office && home) {
        return allNotes;
      } else if (food && office) {
        return allNotes.filter((note) => note.labels.home === false);
      } else if (food && home) {
        return allNotes.filter((note) => note.labels.office === false);
      } else if (office && home) {
        return allNotes.filter((note) => note.labels.food === false);
      } else if (office) {
        return allNotes.filter((note) => note.labels.office);
      } else if (home) {
        return allNotes.filter((note) => note.labels.home);
      } else if (food) {
        return allNotes.filter((note) => note.labels.food);
      } else {
        return allNotes;
      }
    };

    const sortedByOldAndLatest = sortByDate(notes , filter.latest);
    const sortedByLabels = filterByLabel(sortedByOldAndLatest , filter);
    setFilteredNotes(sortedByLabels);
  },[filter , notes]);

  const clearHandler = () => {
    setFilter({
      home:false,
      office:false,
      food:false,
      latest:true,
      old:false,
    })
  }

  

  function addFilteredNotes(items){
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
    setLabels(note.labels);
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
        <i className="bi bi-filter-circle-fill filter-icon" onClick={() => setToggle(prev => !prev)}></i>
        <h3>PINNED</h3>
        <div className="pinned-notes">
          {pinNotes.length === 0  ? "No Pinned Notes" : pinNotes.map((pinNote , index) => (
            <div className="note" key={index}>
            <div className="pinned-icon"><i className="lni lni-pin" style={{fontWeight:'1000'}} onClick={() => unPinnedNote(pinNote)}></i></div>
            <div className="title">{pinNote.title}</div>
            <div className="desc" dangerouslySetInnerHTML={{ __html: pinNote.desc}}></div>
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
          <div className="desc" dangerouslySetInnerHTML={{ __html: note.desc}}></div>
          <div className="label">{note.labels.home ? 'Home' : '' }{note.labels.food ? 'Food' : ''}{note.labels.office ? 'Work' : ''} </div>
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
        <div className={toggle ? 'filter-modal' : 'hidden'}>
          <h3>Tags  <span className='clear-btn' onClick={clearHandler}>CLEAR</span></h3>

           <h3>Sort By </h3>
           <div className="priority">
           <label htmlFor="latest">
            <input checked={filter.latest} onChange={() => setFilter({home:filter.home,office:filter.office,food:filter.food,latest:!filter.latest,old:filter.latest ? true : false})} type="radio" id="latest"/>
            Latest
           </label>
           <label htmlFor="old">
            <input checked={filter.old} onChange={() => setFilter({home:filter.home,office:filter.office,food:filter.food,latest:filter.old ? true : false,old:!filter.old})} type="radio" id="old" />
            old
           </label>
        </div>
        <h3>Labels</h3>
           <div className="priority">
            <input checked={filter.home} onChange={() => setFilter({home:!filter.home,office:filter.office,food:filter.food,latest:filter.latest,old:filter.old})} type="checkbox" id="home" />
           <label className='filterLabel' htmlFor="home">Home</label>
            <input checked={filter.office} onChange={() => setFilter({home:filter.home,office:!filter.office,food:filter.food,latest:filter.latest,old:filter.old})} type="checkbox" id="office" />
           <label className='filterLabel' htmlFor="office">Office</label>
            <input checked={filter.food} onChange={() => setFilter({home:filter.home,office:filter.office,food:!filter.food,latest:filter.latest,old:filter.old})} type="checkbox" id="food" />
           <label className='filterLabel' htmlFor="food">Food</label>
        </div>
        <button className='btn primary-btn' onClick={() => setToggle(prev => !prev)}>Done</button>
        </div>
        </div>
    </div>
 
    </>
  )
}
