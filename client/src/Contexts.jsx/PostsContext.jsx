import { createContext, useState } from 'react';

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [postsList, setPostsList] = useState([]);

  return (
    <PostsContext.Provider value={{ postsList, setPostsList }}>
      {children}
    </PostsContext.Provider>
  );
};