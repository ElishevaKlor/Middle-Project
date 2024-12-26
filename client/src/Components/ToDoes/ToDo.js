import React, { useState, useContext } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { Card, CardHeader, CardContent, CardActions, Avatar, IconButton, Typography, Box, Button } from '@mui/material';
import { red } from '@mui/material/colors';
import { blue } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditWindowToDo from './EditWindowTodo';
import { ToDoesContext } from '../../Contexts.jsx/TodoesContext';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  borderRadius: '16px',
  boxShadow: theme.shadows[5],
  transition: 'transform 0.3s, box-shadow 0.3s',
  marginBottom: '20px',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[15],
  },
  backgroundColor: theme.palette.background.paper,
}));

const ToDo = ({ Todo }) => {
  const { setToDoesList } = useContext(ToDoesContext);
  const [open, setOpen] = useState(false);
  const [completed, setCompleted] = useState(Todo.completed); 

  const DeleteToDo = async (id) => {
    try {
      console.log("Deleting Todo with id:", id);
      const res = await axios.delete(`http://localhost:5000/todoes/${id}`);
      console.log("api response", res.data);
      if (res.status === 200) setToDoesList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleComplete = async () => {
    try {
      const newStatus = !completed;
      setCompleted(newStatus);

      const res = await axios.put(`http://localhost:5000/todoes`, { tags:Todo.tags,title:Todo.title,id:Todo._id,completed: newStatus });
      console.log("check completed:")
      console.log(res.data)
      if (res.status === 200) {
        setToDoesList(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <EditWindowToDo open={open} setOpen={setOpen} Todo={Todo} />
      <StyledCard>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: blue[500] }}>{Todo.title.charAt(0)}</Avatar>}
          subheader={Todo.updatedAt}
        />
        <CardContent>
          <Typography variant="h6">{Todo.title}</Typography>
        </CardContent>
        <CardActions>
          <Box display="flex">
            <IconButton onClick={() => DeleteToDo(Todo._id)} aria-label="delete">
              <DeleteIcon sx={{ color: 'red' }} />
            </IconButton>
            <IconButton onClick={() => setOpen(true)} aria-label="edit">
              <EditIcon sx={{ color: 'blue' }} />
            </IconButton>
            <Button
              variant="contained"
              color={completed ? 'success' : 'default'}
              onClick={() => handleComplete()}
            >
              {completed ? 'Completed' : 'Mark as Completed'}
            </Button>
          </Box>
        </CardActions>
      </StyledCard>
    </>
  );
};

export default ToDo;
