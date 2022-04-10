import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from 'react-router-dom';
import { NoteContextProvider } from "./context/note-context";
import { ArchiveContextProvider } from "./context/archive-note-context";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <NoteContextProvider>
      <ArchiveContextProvider>
      <App />
      </ArchiveContextProvider>
    </NoteContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
