import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { UsersProvider } from './Contexts.jsx/UsersContext';
import { ToDoesProvider } from './Contexts.jsx/TodoesContext';
import {PostsProvider} from './Contexts.jsx/PostsContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UsersProvider>
    <ToDoesProvider>
      <PostsProvider>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
      </PostsProvider>
    </ToDoesProvider>
  </UsersProvider>
);

reportWebVitals();
