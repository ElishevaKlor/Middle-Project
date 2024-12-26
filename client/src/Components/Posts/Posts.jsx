import { Grid, Box, TextField } from '@mui/material';
import Post from './Post';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { PostsContext } from '../../Contexts.jsx/PostsContext';

const Posts = () => {
    const { postsList, setPostsList } = useContext(PostsContext);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [filteredPosts, setFilteredPosts] = useState(postsList);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/posts');
      if (res.status === 200) setPostsList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setFilteredPosts(
        postsList.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, postsList]);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <TextField
          label="Search by title"
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
        {filteredPosts.sort((u1, u2) => u1._id - u2._id).map((post) => (
          <Grid item xs={12} sm={6} key={post._id}> 
            <Post Post={post} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Posts;
