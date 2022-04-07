import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Routes , Route } from 'react-router-dom';
import NotesPage from "./Pages/NotesPage/NotesPage";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import Mockman from 'mockman-js';
import Archive from "./Pages/archivePage/archive";



function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="" element={<NotesPage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/mock" element={<Mockman />}></Route>
        <Route path="/archive" element={<Archive />}></Route>
      </Routes>
    </div>
  );
}

export default App;
