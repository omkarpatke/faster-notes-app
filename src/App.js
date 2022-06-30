import "./App.css";
import { Routes , Route } from 'react-router-dom';
import Mockman from 'mockman-js';
import { Navbar } from "./components/index";
import { NotesPage, Login, SignUp, Archive, Trash, Label } from "./Pages/index";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="notepage-container">
        <Routes>
        <Route path="" element={<NotesPage />}></Route>
        <Route path="/archive" element={<Archive />}></Route>
        <Route path="/label" element={<Label />}></Route>
        <Route path="/trash" element={<Trash />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/mock" element={<Mockman />}></Route>
        </Routes>
        <ToastContainer 
        position="top-right"
        autoClose='1200'
        theme="light"
        />
        </div>
    </div>
  );
}

export default App;
