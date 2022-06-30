import { configureStore } from "@reduxjs/toolkit";
import notesReducers from './notesSlice';
import archiveNoteReducers from './archiveNoteSlice';
import  trashNoteReducers  from './trashNotesSlice';



const store = configureStore({
    reducer:{
       notes: notesReducers, 
       archiveNotes: archiveNoteReducers,
       trashNotes: trashNoteReducers,
    }
})

export { store };