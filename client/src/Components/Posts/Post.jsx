import * as React from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { Card, CardHeader, CardContent, CardActions, Avatar, IconButton, Typography, Box } from '@mui/material';
import { blue } from '@mui/material/colors';
import { red } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditWindowPost from './EditWindowPost'
import { useState, useContext } from 'react';
import { PostsContext } from '../../Contexts.jsx/PostsContext';
import '@fontsource/roboto';
import '@fontsource/poppins';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 400,
  borderRadius: '16px',
  boxShadow: theme.shadows[5],
  transition: 'transform 0.3s, box-shadow 0.3s',
  marginBottom: '20px',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[15],
  },
  backgroundColor: theme.palette.background.paper,
  fontFamily: 'Roboto, sans-serif',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: blue[500],
  fontSize: '1.5rem',
  fontFamily: 'Poppins, sans-serif', 
  width: '48px',  
  height: '48px', 
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  paddingBottom: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const StyledCardActions = styled(CardActions)(({ theme }) => ({
  justifyContent: 'space-between',
  paddingTop: '1rem',
  paddingBottom: '1rem',
}));

const Post = (props) => {
  const { postsList, setPostsList } = useContext(PostsContext);
  const [open, setOpen] = useState(false);

  const DeletePost = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/posts/${id}`);
      if (res.status === 200)
        setPostsList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <EditWindowPost open={open} setOpen={setOpen} Post={props.Post} />
      <StyledCard>
        <StyledCardHeader
          avatar={
            <StyledAvatar aria-label="user">
              {props.Post.title.charAt(0)} 
            </StyledAvatar>
          }
          subheader={<Typography variant="body2" sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>{props.Post.updatedAt}</Typography>}
        />
         <CardContent sx={{ textAlign: 'center', paddingTop: '1rem' }}>
          <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 'bold', fontSize: '1.2rem' }}>
            {props.Post.title} 
          </Typography>
        </CardContent>
        <CardContent sx={{ textAlign: 'center', paddingTop: '1rem' }}>
          <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 'bold', fontSize: '1.2rem' }}>
            {props.Post.body} 
          </Typography>
        </CardContent>
        <StyledCardActions disableSpacing>
          <Box display="flex" alignItems="center">
            <IconButton onClick={() => DeletePost(props.Post._id)} aria-label="delete">
              <DeleteIcon sx={{ color: 'red' }} />
            </IconButton>
            <IconButton onClick={() => setOpen(true)} aria-label="edit">
              <EditIcon sx={{ color: 'blue' }} />
            </IconButton>
          </Box>
        </StyledCardActions>
      </StyledCard>
    </>
  );
};
export default Post;
