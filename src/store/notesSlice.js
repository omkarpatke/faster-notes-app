import { createSlice } from "@reduxjs/toolkit";

const notesSlice = createSlice({
    name:'Notes',
    initialState:[],
    reducers:{
        addNoteToBackend(state , action){
            return [action.payload , ...state];
        },

        removeNote(state, action){
            return [...state.filter(item => item._id !== action.payload._id)]; 
        },
        
        removeAllNotes(state){
            return [...state.filter(item => item._id === '1234')]; 
        },

        editNotes(state , action){
            return [...state.map(item => item._id === action.payload.editNoteId ? {...item , title: action.payload.note.title , desc: action.payload.note.desc , time: action.payload.note.time , bgColor: action.payload.note.bgColor , labels: action.payload.note.labels} : item)]
        },

        setNoteColor(state , action){
            return [...state.map(item => item._id === action.payload.note._id ? {...item , bgColor:action.payload.color } : item)]
        },

        getFilteredNotes(state , action){
            return [...state.filter(item => item.title.includes(action.payload))]
        }
    }
})

export const { addNoteToBackend , removeNote, removeAllNotes, editNotes, setNoteColor, getFilteredNotes } = notesSlice.actions;
export default notesSlice.reducer;