import { createContext , useContext } from 'react';
import { toast } from 'react-toastify';

const ToastContext = createContext('');
const useToastContext = () => useContext(ToastContext);
 
const ToastContextProvider = ({children}) => {
    const notify = (msg , type) => {
        toast(msg ,type);
    }
    return (<ToastContext.Provider value={notify}>{children}</ToastContext.Provider>)
}

export { useToastContext , ToastContextProvider }