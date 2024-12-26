import * as React from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { Card, CardHeader, CardContent, CardActions, Avatar, IconButton, Typography, Box } from '@mui/material';
import { blue } from '@mui/material/colors';
import { red } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditWindow from './EditWindowUser';
import { useState, useContext } from 'react';
import { UsersContext } from '../../Contexts.jsx/UsersContext';
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

const User = (props) => {
  const { usersList, setUsersList } = useContext(UsersContext);
  const [open, setOpen] = useState(false);

  const DeleteUser = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/Users/${id}`);
      if (res.status === 200)
        setUsersList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <EditWindow open={open} setOpen={setOpen} User={props.User} />
      <StyledCard>
        <StyledCardHeader
          avatar={
            <StyledAvatar aria-label="user">
              {props.User.userName.charAt(0)} 
            </StyledAvatar>
          }
          subheader={<Typography variant="body2" sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>{props.User.updatedAt}</Typography>}
        />
        <CardContent sx={{ textAlign: 'center', paddingTop: '1rem' }}>
          <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 'bold', fontSize: '1.2rem' }}>
            {props.User.name} ({props.User.userName})
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1rem', marginTop: '6px' }}>
            {props.User.email}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1rem', marginTop: '6px' }}>
            {props.User.phone || 'Not Provided'}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1rem', marginTop: '6px' }}>
            {props.User.address || 'Not Provided'}
          </Typography>
        </CardContent>
        <StyledCardActions disableSpacing>
          <Box display="flex" alignItems="center">
            <IconButton onClick={() => DeleteUser(props.User._id)} aria-label="delete">
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

export default User;
