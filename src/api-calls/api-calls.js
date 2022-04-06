import axios from "axios";

const encodedToken = localStorage.getItem('token');

    const addNoteToBackend = async(note) => {
        try {
            const response = await axios.post('/api/notes' , {note} ,{
                headers: {
                    authorization: encodedToken
                }
            })
            console.log(response)
        } catch (err) {
            console.log(err);
        }
    }
   
    

 export { addNoteToBackend };



