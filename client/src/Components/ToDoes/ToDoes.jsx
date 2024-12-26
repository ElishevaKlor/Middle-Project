import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import ToDo from './ToDo';
import { ToDoesContext } from '../../Contexts.jsx/TodoesContext';
import { TextField, Box, Grid } from '@mui/material';

const ToDoes = () => {
  const { toDoesList, setToDoesList } = useContext(ToDoesContext);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [tagsSearchTerm, setTagsSearchTerm] = useState(''); 
  const [filteredToDoes, setFilteredToDoes] = useState([]);

  useEffect(() => {
    getAllToDoes();
  }, []);

  useEffect(() => {
    setFilteredToDoes(
      toDoesList.filter((todo) => {
        const titleMatch = todo.title?.toLowerCase().includes(searchTerm.toLowerCase());
        const tagsMatch = todo.tags?.some((tag) =>
          tag.toLowerCase().includes(tagsSearchTerm.toLowerCase())
        );
        return titleMatch && tagsMatch;
      })
    );
  }, [searchTerm, tagsSearchTerm, toDoesList]);

  const getAllToDoes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/todoes');
      if (res.status === 200) setToDoesList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <TextField
          label="Search by Title"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            width: '300px',
            borderRadius: '8px',
            boxShadow: 2,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#ccc',
              },
              '&:hover fieldset': {
                borderColor: '#3f51b5',
              },
            },
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <TextField
          label="Search by Category"
          variant="outlined"
          value={tagsSearchTerm}
          onChange={(e) => setTagsSearchTerm(e.target.value)}
          sx={{
            width: '300px',
            borderRadius: '8px',
            boxShadow: 2,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#ccc',
              },
              '&:hover fieldset': {
                borderColor: '#3f51b5',
              },
            },
          }}
        />
      </Box>

      <Grid container spacing={3}>
        {filteredToDoes.sort((u1, u2) => u1._id - u2._id).map((todo) => (
          <Grid item xs={12} sm={6} key={todo._id}> 
            <ToDo Todo={todo} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ToDoes;
