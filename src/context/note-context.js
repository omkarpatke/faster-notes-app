import axios from "axios";
import { createContext , useContext , useReducer , useEffect , useState } from "react";



const NoteContext = createContext('');

const useNote = () => useContext(NoteContext);


const NoteContextProvider = ({children}) => {

    const reducer = (accu , action) => {
        switch(action.type){
            case 'ADD_NOTE':
                return {...accu , payload : action.payload}
    
            case 'REMOVE_NOTE':
                return {...accu , payload : action.payload}
    
            case 'ARCHIVE_NOTE':
                return {...accu , payload : action.payload}
            
            default :
                 return {...accu}
        }
    }

    const { state , dispatch } = useReducer(reducer , {type:'' , payload:''});
    const [notes , setNotes] = useState([]);
    const [isLogin , setIsLogin] = useState(false);
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
                console.log(err);
            }
        }
        getNotes();
    })
    


    return (<NoteContext.Provider value={{state , dispatch ,notes , isLogin , setIsLogin }}>{children}</NoteContext.Provider>)
}

export {useNote , NoteContextProvider}