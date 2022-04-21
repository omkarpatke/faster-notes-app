import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from 'react-router-dom';
import { NoteContextProvider, TrashContextProvider, ToastContextProvider, ArchiveContextProvider } from "./context/index";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <NoteContextProvider>
      <ArchiveContextProvider>
        <ToastContextProvider>
          <TrashContextProvider>
           <App />
          </TrashContextProvider>
        </ToastContextProvider>
      </ArchiveContextProvider>
    </NoteContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
