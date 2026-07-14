import { useState, useEffect } from 'react';
import { Box, Stack, Button } from '@mui/material';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import Sidebar from './Sidebar';
import Videos from './Videos';

const tags = ['New', 'Music', 'Tech', 'Gaming', 'Cooking', 'Crafts', 'Sports', 'Live', 'Sci-Fi'];

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState('Home'); 
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Standardize query name formatting for search execution
    const searchQuery = selectedCategory === 'Home' ? 'New' : selectedCategory;
    
    fetchFromAPI(`search?part=snippet&q=${searchQuery}`)
      .then((data) => {
        if (data?.items) setVideos(data.items);
      })
      .catch((err) => console.error("Fetch failure: ", err));
  }, [selectedCategory]);

  return (
    <Stack direction="row" sx={{ backgroundColor: '#0f0f0f', minHeight: 'calc(100vh - 56px)', width: '100%' }}>
      {/* Pass structural state parameters down into the updated sidebar module */}
      <Box sx={{ display: { xs: 'none', md: 'block' }, flexShrink: 0 }}>
        <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      </Box>

      {/* Central Content Window: Configured layout margins and padding spaces */}
      <Box p={3} sx={{ overflowY: 'auto', height: 'calc(100vh - 56px)', flex: 1, boxSizing: 'border-box' }}>
        
        {/* Horizontal Chips Tag Row */}
        <Stack 
          direction="row" 
          gap={1.5} 
          sx={{ 
            overflowX: 'auto', 
            mb: 3, 
            pb: 1, 
            whiteSpace: 'nowrap',
            '&::-webkit-scrollbar': { height: '0px' } 
          }}
        >
          {tags.map((tag) => {
            const isTagActive = tag === selectedCategory || (tag === 'New' && selectedCategory === 'Home');
            return (
              <Button
                key={tag}
                onClick={() => setSelectedCategory(tag === 'New' ? 'Home' : tag)}
                variant="contained"
                sx={{
                  backgroundColor: isTagActive ? 'white' : '#212121',
                  color: isTagActive ? 'black' : 'white',
                  textTransform: 'none',
                  borderRadius: '8px',
                  fontWeight: '500',
                  padding: '6px 14px',
                  '&:hover': { backgroundColor: isTagActive ? 'white' : '#3d3d3d' }
                }}
              >
                {tag}
              </Button>
            );
          })}
        </Stack>

        {/* Video Grid Component Wrapper */}
        <Box sx={{ width: '100%' }}>
          <Videos videos={videos} />
        </Box>
      </Box>
    </Stack>
  );
};

export default Feed;
