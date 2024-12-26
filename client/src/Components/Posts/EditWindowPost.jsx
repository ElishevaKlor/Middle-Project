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
import {  useContext } from 'react';
import { PostsContext } from '../../Contexts.jsx/PostsContext';

const EditWindowPost = (props) => {
    console.log("from EditWindowPost")
  const { setPostsList } = useContext(PostsContext);

  const [title, setTitle] = useState(props.Post ? props.Post.title : ''); 
  const [body, setBody] = useState(props.Post ? props.Post.body : ''); 
  const [error, setError] = useState(false);
  const UpdatePost = async (newPost) => {
    newPost['id'] = props.Post._id;
    try {
      const res = await axios.put('http://localhost:5000/posts', newPost);
      if (res.status === 200) setPostsList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const CreatePost = async (newPost) => {
    try {
      const res = await axios.post('http://localhost:5000/posts', newPost);
      if (res.status === 200) {
        setPostsList(res.data);
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

    const newPost = {
      title: title.trim(),
      body:body
    };

    if (props.Post) {
      UpdatePost(newPost);
    } else {
      CreatePost(newPost);
    }

    props.setOpen(false);
  };


  const handleClose = () => {
    props.setOpen(false);
  };
  console.log(props.Post)
  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {props.Post ? "Edit Post" : "Create a new post"}
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
                // value={title}
                defaultValue={props.Post?.title} 
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
                label="Body"
                variant="standard"
                // value={body} 
                defaultValue={props.Post?.body} 
                onChange={(e) => setBody(e.target.value)}
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


export default EditWindowPost;
