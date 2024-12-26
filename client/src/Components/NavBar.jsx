import * as React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Drawer, Box, CssBaseline } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { Home, People, PostAdd, Assignment } from '@mui/icons-material';
import { Outlet } from 'react-router-dom'; 
import { Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditWindowUser from './Users/EditWindowUser';
import EditWindowToDo from './ToDoes/EditWindowTodo';
import EditWindowPost from './Posts/EditWindowPost'

const NAVIGATION = [
  {
    segment: '/',
    title: 'Home',
    icon: <Home />,
  },
  {
    segment: '/users',
    title: 'Users',
    icon: <People />,
  },
  {
    segment: '/posts',
    title: 'Posts',
    icon: <PostAdd />,
  },
  {
    segment: '/todoes',
    title: 'Todo',
    icon: <Assignment />,
  },
];

const NavigationList = () => {
  return (
    <List>
      {NAVIGATION.map((item, index) => (
        <ListItem 
          button 
          component={Link} 
          to={item.segment} 
          key={index}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItem>
      ))}
    </List>
  );
};

export default function DashboardLayoutBasic() {
  const location = useLocation();
  const [open, setOpen] = React.useState(false);

  return (
    <>
   {location.pathname === '/users' ? (
  <EditWindowUser
    open={open} 
    setOpen={setOpen} 
  />
) : location.pathname === '/todoes' ? (
  <EditWindowToDo
    open={open} 
    setOpen={setOpen} 
  />
) : (
  <EditWindowPost
    open={open} 
    setOpen={setOpen} 
  />
)}

      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 240,
              boxSizing: 'border-box',
              backgroundColor: '#ffffff',
              color: '#333',
              padding: '16px 0',
              boxShadow: '4px 0 10px rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          <div style={{ padding: '16px' }}>
            <Typography variant="h6" color="inherit">
              Dashboard
            </Typography>
          </div>
          <NavigationList />
        </Drawer>

        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ padding: '16px', marginTop: '64px' }}>
            <Outlet />
          </Box>
        </Box>
      </Box>

      <IconButton 
        sx={{
          position: 'fixed',
          bottom: 16,
          left: 16,
          backgroundColor: 'primary.main',
          color: 'white',
          padding: 1,
          borderRadius: '50%',
          boxShadow: 3,
          zIndex: 9999,
          '&:hover': {
            backgroundColor: 'primary.dark',
          },
        }}
        onClick={() => {
            setOpen(true)
             }}
      >
        <AddIcon />
      </IconButton>
    </>
  );
}
