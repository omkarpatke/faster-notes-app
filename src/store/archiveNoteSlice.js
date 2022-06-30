import { createSlice } from "@reduxjs/toolkit";

const archiveNotesSlice = createSlice({
    name:'ArchiveNotes',
    initialState:[],
    reducers:{
        addNoteToArchive(state , action){
            return [...state , action.payload];
        },

        removeArchiveNote(state, action){
            return [...state.filter(item => item._id !== action.payload._id)]; 
        },
        
        removeAllArchiveNotes(state){
            return [...state.filter(item => item._id === '1234')]; 
        },

        setNoteColor(state , action){
            return [...state.map(item => item._id === action.payload.note._id ? {...item , bgColor:action.payload.color } : item)]
        },
    }
});

export const { addNoteToArchive , removeArchiveNote, removeAllArchiveNotes, setNoteColor } = archiveNotesSlice.actions;
export default archiveNotesSlice.reducer;