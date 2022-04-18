import {createContext , useContext , useEffect , useState } from 'react';
import axios from 'axios';
import { useToastContext } from '../context/toastContext';

const ArchiveContext = createContext('');
const useArchiveNote = () => useContext(ArchiveContext);

const ArchiveContextProvider = ({children}) => {
   const [archiveNotes , setArchiveNotes] = useState([]);
   const encodedToken = localStorage.getItem('token');
   const notify = useToastContext();

   const addToArchiveNotes = async(note) => {
    try {
        const response = await axios.post(`/api/notes/archives/${note._id}` , {note} ,
        {
            headers: {
                authorization: encodedToken
            }
        })
        if(response.status === 200){
            notify("Added In Archive Notes" , {type:'success'});
            setArchiveNotes(response.data.archives);
        }
    } catch (err) {
        console.error(err);
    }
   }

   const reStoreArchiveNote = async(note) => {
    try {
        const response = await axios.post(`/api/archives/restore/${note._id}` , {note} ,
        {
            headers: {
                authorization: encodedToken
            }
        })
        setArchiveNotes(response.data.archives);
    } catch (err) {
        console.log(err);
    }
   }

   const deleteArchiveNote = async(note) => {
    try {
        const response = await axios.delete(`/api/archives/delete/${note._id}`,
        {
            headers: {
                authorization: encodedToken
            }
        });
        if(response.status){
            notify("Remove Archive Notes" , {type:'success'});
        }
    } catch (err) {
        console.error(err);
    }
   }

   
   useEffect(() => {
       const getArchiveNotes = async() => {
        try {
            const response = await axios.get(`/api/archives` , 
            {
                headers: {
                    authorization: encodedToken
                }
            })
            setArchiveNotes(response.data.archives);
        } catch (err) {
            console.log(err);
        }
       }
       getArchiveNotes();
   })


    return (<ArchiveContext.Provider value={{ archiveNotes , addToArchiveNotes , reStoreArchiveNote ,deleteArchiveNote }}>{children}</ArchiveContext.Provider>)
}

export { useArchiveNote , ArchiveContextProvider };