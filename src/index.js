import React from "react";
import "./index.css";
import App from "./App";
import * as ReactDOMClient from 'react-dom/client';
import { makeServer } from "./server";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from './store/store';
import { NoteContextProvider, ToastContextProvider } from "./context/index";


// Call make Server
makeServer();

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);
root.render(
    <BrowserRouter>
    <NoteContextProvider>
        <ToastContextProvider>
            <Provider store={store}>
           <App />
            </Provider>
        </ToastContextProvider>
    </NoteContextProvider>
    </BrowserRouter>
);
