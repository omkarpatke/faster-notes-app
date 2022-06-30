import { createSlice } from "@reduxjs/toolkit";

const trashNotesSlice = createSlice({
    name:'trashNotes',
    initialState:[],
    reducers:{
        addToTrash(state , action){
            return [...state , action.payload];
        },

        deleteFromTrash(state, action){
            return [...state.filter(item => item._id !== action.payload._id)]; 
        },
        
        removeAllTrashNotes(state){
            return [...state.filter(item => item._id === '1234')]; 
        },

        setTrashNoteColor(state , action){
            return [...state.map(item => item._id === action.payload.note._id ? {...item , bgColor:action.payload.color } : item)]
        },

    }
});

export const { addToTrash , deleteFromTrash, removeAllTrashNotes, setTrashNoteColor } = trashNotesSlice.actions;
export default trashNotesSlice.reducer;