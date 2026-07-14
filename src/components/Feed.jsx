import { useState, useEffect } from 'react';
import { Box, Stack, Button } from '@mui/material';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import Sidebar from './Sidebar';
import Videos from './Videos';

const tags = ['New', 'Music', 'Tech', 'Gaming', 'Cooking', 'Crafts', 'Sports', 'Live', 'Sci-Fi'];

const Feed = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [selectedCategory, setSelectedCategory] = useState('Home'); 
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const searchQuery = selectedCategory === 'Home' ? 'New' : selectedCategory;
    fetchFromAPI(`search?part=snippet&q=${searchQuery}`)
      .then((data) => { if (data?.items) setVideos(data.items); })
      .catch((err) => console.error(err));
  }, [selectedCategory]);

  return (
    <Box sx={{ backgroundColor: '#0f0f0f', height: 'calc(100vh - 56px)', position: 'relative', overflow: 'hidden' }}>
      
      {/* Absolute Overlay Sidebar Wrapper */}
      <Box 
        sx={{ 
          position: 'absolute',
          top: 0,
          left: isSidebarOpen ? 0 : '-240px', // Recedes completely back out of frame when false
          height: '100%',
          zIndex: 90,
          transition: 'left 0.3s ease-in-out', // Smooth sliding movement transition
          boxShadow: isSidebarOpen ? '5px 0px 15px rgba(0,0,0,0.5)' : 'none'
        }}
      >
        <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      </Box>

      {/* Click-Away Backdrop Layer: Closes sidebar if you click outside it */}
      {isSidebarOpen && (
        <Box 
          onClick={() => setIsSidebarOpen(false)}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: 80
          }}
        />
      )}

      {/* Main Grid Viewport Canvas Container */}
      <Box 
        p={3} 
        sx={{ 
          overflowY: 'auto', 
          overflowX: 'hidden', 
          height: '100%', 
          boxSizing: 'border-box',
          width: '100%'
        }}
      >
        {/* Horizontal Chips Tag Row */}
        <Stack 
          direction="row" 
          gap={1.5} 
          sx={{ 
            overflowX: 'auto', 
            mb: 3, 
            pb: 1, 
            whiteSpace: 'nowrap',
            width: '100%',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' }
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
    </Box>
  );
};

export default Feed;
