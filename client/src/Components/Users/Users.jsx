import { Grid, Box, TextField } from '@mui/material';
import User from './User';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UsersContext } from '../../Contexts.jsx/UsersContext';

const Users = () => {
  const { usersList, setUsersList } = useContext(UsersContext);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [filteredUsers, setFilteredUsers] = useState(usersList);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/Users');
      if (res.status === 200) setUsersList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setFilteredUsers(
      usersList.filter(user =>
        user.userName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, usersList]);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <TextField
          label="Search by Username"
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

      <Grid container spacing={3}>
        {filteredUsers.sort((u1, u2) => u1._id - u2._id).map((user) => (
          <Grid item xs={12} sm={6} key={user._id}> 
            <User User={user} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Users;
