import { createContext , useContext, useReducer } from 'react';


const TrashContext = createContext('');
const useTrashContext = () => useContext(TrashContext);

const trashReducer = (accu , {type , payload}) => {
    switch(type){
        case 'ADD_TO_TRASH':
            return {...accu , trashNotes:[...accu.trashNotes , payload]}

        case 'DELETE_FROM_TRASH':
            return { ...accu, trashNotes: payload };
        
        default:
            return accu;
    }
}
 
const TrashContextProvider = ({children}) => {
    const [trashState, trashDispatch] = useReducer(trashReducer, {
        trashNotes: [],
      });


    
    return (<TrashContext.Provider value={{trashState, trashDispatch}}>{children}</TrashContext.Provider>)
}

export { useTrashContext , TrashContextProvider }