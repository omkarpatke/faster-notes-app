import axios from "axios";

const encodedToken = localStorage.getItem('token');

    const addNoteToBackend = async(note) => {
        try {
             await axios.post('/api/notes' , {note} ,{
                headers: {
                    authorization: encodedToken
                }
            })
            
        } catch (err) {
            console.log(err);
        }
    }
   
    

 export { addNoteToBackend };



