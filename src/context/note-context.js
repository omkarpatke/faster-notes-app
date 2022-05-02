import axios from "axios";
import { createContext , useContext , useReducer , useEffect , useState } from "react";



const NoteContext = createContext('');

const useNote = () => useContext(NoteContext);


const NoteContextProvider = ({children}) => {
    const [showForm , setShowForm] = useState(false);
    const [isEditNoteForm , setIsEditNoteForm] = useState(false);
    const [title , setTitle] = useState('');
    const [desc , setDesc] = useState('');

    const reducer = (accu , action) => {
        
        switch(action.type){
            case 'ADD_NOTE':
                return {...accu , payload : action.payload}
    
            case 'REMOVE_NOTE':
                return {...accu , payload : action.payload}
    
            case 'ARCHIVE_NOTE':
                return {...accu , payload : action.payload}

            case 'EDIT_NOTE_ID':
                console.log(action);
                return {...accu , noteId : action.payload}
            
            default :
                 return {...accu}
        }
    }

    const { state , dispatch } = useReducer(reducer , {type:'' , payload:''});
    const [notes , setNotes] = useState([]);
    const [pinNotes , setPinNotes] = useState([]);
    const [editNoteId , setEditNoteId] = useState('');
    const [isLogin , setIsLogin] = useState(false);

    useEffect(() => {
       if(localStorage.getItem('token')){
           setIsLogin(true);
       }else{
           setIsLogin(false);
       }
    },[window.reload])
    

    const addNoteToBackend = async(note) => {
        try {
             await axios.post('/api/notes' , {note} ,{
                headers: {
                    authorization: encodedToken
                }
            })
        } catch (err) {
            console.error(err);
        }
    }

    const deleteNote = async(note) => {
        try{ 
          await axios.delete(`/api/notes/${note._id}` , 
          {headers : {authorization : encodedToken}}
           , {note})
          }
        catch (err) {
          console.error(err)
        }
   }
   
    
    const encodedToken = localStorage.getItem('token');
    useEffect(() => {
        const getNotes = async() => {
            try {
                const response = await axios.get(`/api/notes` , 
                {
                    headers: {
                        authorization: encodedToken
                    }
                })
                setNotes(response.data.notes);
            } catch (err) {
                console.error(err);
            }
        }
        getNotes();
    })
    


    return (<NoteContext.Provider value={{isEditNoteForm, setIsEditNoteForm ,setDesc, desc, setTitle, title, showForm, setShowForm, deleteNote, state , pinNotes, setPinNotes, dispatch, notes, setNotes, isLogin, setIsLogin, addNoteToBackend, setEditNoteId , editNoteId }}>{children}</NoteContext.Provider>)
}

export {useNote , NoteContextProvider}