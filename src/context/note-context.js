
import { createContext , useContext ,useEffect , useState } from "react";



const NoteContext = createContext('');

const useNote = () => useContext(NoteContext);


const NoteContextProvider = ({children}) => {
    const [showForm , setShowForm] = useState(false);
    const [isEditNoteForm , setIsEditNoteForm] = useState(false);
    const [editNoteId , setEditNoteId] = useState('');
    const [isLogin , setIsLogin] = useState(false);
    const [title , setTitle] = useState('');
    const [desc , setDesc] = useState('');
    const [pinNotes , setPinNotes] = useState([]);
    const [labels , setLabels] = useState({
        home:false,
        office:false,
        food:false
      });


    useEffect(() => {
       if(localStorage.getItem('token')){
           setIsLogin(true);
       }else{
           setIsLogin(false);
       }
    },[]);
    
    return (<NoteContext.Provider value={{title ,pinNotes , setPinNotes,  setTitle , desc ,labels,setLabels , setDesc, isEditNoteForm, setIsEditNoteForm , showForm, setShowForm, isLogin, setIsLogin, setEditNoteId , editNoteId }}>{children}</NoteContext.Provider>)
}

export {useNote , NoteContextProvider}