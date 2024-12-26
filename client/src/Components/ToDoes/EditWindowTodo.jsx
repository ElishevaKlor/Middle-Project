import { Fragment, useState } from "react";
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useContext } from 'react';
import { ToDoesContext } from '../../Contexts.jsx/TodoesContext';

const EditWindowToDo = (props) => {
  const { setToDoesList } = useContext(ToDoesContext);

  const [title, setTitle] = useState(props.Todo ? props.Todo.title : ''); 
  const [categories, setCategories] = useState(props.Todo ? props.Todo.tags : []); 
  const [error, setError] = useState(false);

  const UpdateToDo = async (newToDo) => {
    newToDo['id'] = props.Todo._id;
    try {
      const res = await axios.put('http://localhost:5000/todoes', newToDo);
      if (res.status === 200) setToDoesList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const CreateToDo = async (newToDo) => {
    try {
      const res = await axios.post('http://localhost:5000/todoes', newToDo);
      if (res.status === 200) {
        setToDoesList(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const save = async () => {
    if (!title.trim()) {
      setError(true);
      return;
    }

    const newToDo = {
      title: title.trim(),
      tags: categories, 
    };

    if (props.Todo) {
      UpdateToDo(newToDo);
    } else {
      CreateToDo(newToDo);
    }

    props.setOpen(false);
  };

  const handleCategoryChange = (e) => {
    const input = e.target.value;
    const categoryArray = input.split(',').map((category) => category.trim()).filter(Boolean);
    console.log(categoryArray)
    setCategories(categoryArray);
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {props.Todo ? "Edit Task" : "Create a new task"}
      </DialogTitle>
      <DialogContent>
        <Container component="main" sx={{ pt: 3 }}>
          <AppBar position="fixed" component="nav">
            <Toolbar></Toolbar>
          </AppBar>
          <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <br />
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField
                id="input-title"
                label="Title"
                variant="standard"
                defaultValue={props.Todo?.title} 
                onChange={(e) => {
                  setTitle(e.target.value);
                  setError(false);
                }}
                required
                error={error}
                helperText={error ? "Title is required" : ""}
              />
            </Box>
            <br />
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField
                id="input-category"
                label="Category"
                variant="standard"
                defaultValue={props.Todo?.tags.join(",")} 
                onChange={handleCategoryChange}
              />
            </Box>
          </Box>
        </Container>
      </DialogContent>
      <DialogActions>
        <Button size="small" onClick={handleClose}>
          Cancel
        </Button>
        <Button size="small" onClick={save} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditWindowToDo;
