import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Routes , Route } from 'react-router-dom';
import NotesPage from "./Pages/NotesPage/NotesPage";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import Mockman from 'mockman-js';
import Archive from "./Pages/archivePage/archive";
import Trash from "./Pages/Trash/trash";
import Label from "./Pages/Label/Label";
import Account from "./Pages/Account/Account";
import Sidebar from "./components/Sidebar/Sidebar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/mock" element={<Mockman />}></Route>
      </Routes>
      <div className="notepage-container">
        <Sidebar />
        <Routes>
        <Route path="" element={<NotesPage />}></Route>
        <Route path="/archive" element={<Archive />}></Route>
        <Route path="/account" element={<Account />}></Route>
        <Route path="/label" element={<Label />}></Route>
        <Route path="/trash" element={<Trash />}></Route>
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
