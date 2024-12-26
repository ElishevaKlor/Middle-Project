import React, { createContext, useState } from 'react';

export const ToDoesContext = createContext();

export const ToDoesProvider = ({ children }) => {
  const [toDoesList, setToDoesList] = useState([]);

  return (
    <ToDoesContext.Provider value={{ toDoesList, setToDoesList }}>
      {children}
    </ToDoesContext.Provider>
  );
};
