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
    const searchQuery = selectedCategory === 'Home' ? 'New' : selectedCategory;
    fetchFromAPI(`search?part=snippet&q=${searchQuery}`)
      .then((data) => { if (data?.items) setVideos(data.items); })
      .catch((err) => console.error(err));
  }, [selectedCategory]);

  return (
    <Stack direction="row" sx={{ backgroundColor: '#0f0f0f', height: 'calc(100vh - 56px)', overflow: 'hidden' }}>
      <Box sx={{ display: { xs: 'none', md: 'block' }, flexShrink: 0 }}>
        <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      </Box>

      <Box p={3} sx={{ overflowY: 'auto', overflowX: 'hidden', flex: 1, height: '100%', boxSizing: 'border-box' }}>
        
        {/* Horizontal Scroll Bar for Category Tags - Supports Left/Right Swiping */}
        <Stack 
          direction="row" 
          gap={1.5} 
          sx={{ 
            overflowX: 'auto', 
            mb: 3, 
            pb: 1, 
            whiteSpace: 'nowrap',
            width: '100%',
            scrollbarWidth: 'none', // Hides scrollbar on Firefox
            '&::-webkit-scrollbar': { display: 'none' }, // Hides scrollbar on Chrome, Safari, and Edge
            msOverflowStyle: 'none', // Hides scrollbar on IE/Edge
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
                  flexShrink: 0,
                  '&:hover': { backgroundColor: isTagActive ? 'white' : '#3d3d3d' }
                }}
              >
                {tag}
              </Button>
            );
          })}
        </Stack>

        <Box sx={{ width: '100%' }}>
          <Videos videos={videos} />
        </Box>
      </Box>
    </Stack>
  );
};

export default Feed;
