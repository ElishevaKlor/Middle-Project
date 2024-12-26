import React from 'react';
import { Typography, Button, Box, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  borderRadius: '16px',
  boxShadow: theme.shadows[5],
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const HomePage = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
        Welcome to Your Dashboard
      </Typography>

      <Typography variant="h6" align="center" paragraph sx={{ color: '#7f8c8d' }}>
        This is your central hub where you can manage users, posts, todo, and much more. Choose a section below to get started.
      </Typography>

      <Grid container spacing={3} justifyContent="center" alignItems="center" sx={{ marginTop: '30px' }}>
        <Grid item xs={12} sm={4}>
          <StyledPaper>
            <AccountCircleIcon sx={{ fontSize: '3rem' }} />
            <Typography variant="h5" sx={{ marginTop: '10px' }}>User Management</Typography>
            <Typography variant="body2" sx={{ marginTop: '10px' }}>
              Manage your users and their details in one place.
            </Typography>
            <Link to="/users" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                color="secondary"
                sx={{ marginTop: '20px' }}
                endIcon={<ArrowForwardIcon />}
              >
                View Users
              </Button>
            </Link>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} sm={4}>
          <StyledPaper>
            <PostAddIcon sx={{ fontSize: '3rem' }} />
            <Typography variant="h5" sx={{ marginTop: '10px' }}>Post Management</Typography>
            <Typography variant="body2" sx={{ marginTop: '10px' }}>
              Create, update, or delete your posts with ease.
            </Typography>
            <Link to="/posts" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                color="secondary"
                sx={{ marginTop: '20px' }}
                endIcon={<ArrowForwardIcon />}
              >
                Manage Posts
              </Button>
            </Link>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} sm={4}>
          <StyledPaper>
            <ListAltIcon sx={{ fontSize: '3rem' }} />
            <Typography variant="h5" sx={{ marginTop: '10px' }}>To-Do List</Typography>
            <Typography variant="body2" sx={{ marginTop: '10px' }}>
              Stay on top of tasks and track your progress.
            </Typography>
            <Link to="/todoes" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                color="secondary"
                sx={{ marginTop: '20px' }}
                endIcon={<ArrowForwardIcon />}
              >
                View Todos
              </Button>
            </Link>
          </StyledPaper>
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
