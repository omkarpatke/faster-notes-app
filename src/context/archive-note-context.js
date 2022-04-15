import {createContext , useContext , useEffect , useState } from 'react';
import axios from 'axios';

const ArchiveContext = createContext('');
const useArchiveNote = () => useContext(ArchiveContext);

const ArchiveContextProvider = ({children}) => {
   const [archiveNotes , setArchiveNotes] = useState([]);
   const encodedToken = localStorage.getItem('token');

   const addToArchiveNotes = async(note) => {
    try {
        const response = await axios.post(`/api/notes/archives/${note._id}` , {note} ,
        {
            headers: {
                authorization: encodedToken
            }
        })
        if(response.status === 200){
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
       console.log(note._id)
    try {
        const response = await axios.delete(`/api/archives/delete/${note._id}`,
        {
            headers: {
                authorization: encodedToken
            }
        })
        console.log(response);
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