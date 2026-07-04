import { useState, useEffect } from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import Sidebar from './Sidebar';
import Videos from './Videos';

const tags = ['New', 'Music', 'Sports', 'Gaming', 'Fashion', 'Coding', 'Movies', 'News', 'Live', 'Crypto', 'Sci-Fi'];

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState('Coding'); // Active category from screenshot
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
      .then((data) => setVideos(data.items))
      .catch((err) => console.log(err));
  }, [selectedCategory]);

  return (
    <Stack sx={{ flexDirection: 'row', backgroundColor: '#0f0f0f' }}>
      {/* Left fixed Sidebar Panel */}
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <Sidebar />
      </Box>

      {/* Main Dynamic Workspace Area */}
      <Box p={2} sx={{ overflowY: 'auto', height: '92vh', flex: 1 }}>
        
        {/* Horizontal Scroll Bar for Sub-category Tags */}
        <Stack 
          direction="row" 
          gap={1.5} 
          sx={{ 
            overflowX: 'auto', 
            mb: 3, 
            pb: 1,
            '&::-webkit-scrollbar': { height: '0px' }, // Hide horizontal scrollbar line
          }}
        >
          {tags.map((tag) => (
            <Button
              key={tag}
              onClick={() => setSelectedCategory(tag)}
              variant="contained"
              sx={{
                backgroundColor: tag === selectedCategory ? 'white' : '#212121',
                color: tag === selectedCategory ? 'black' : 'white',
                textTransform: 'none',
                borderRadius: '8px',
                fontWeight: '500',
                whiteSpace: 'nowrap',
                padding: '6px 14px',
                minWidth: 'auto',
                '&:hover': {
                  backgroundColor: tag === selectedCategory ? 'white' : '#3d3d3d',
                }
              }}
            >
              {tag}
            </Button>
          ))}
        </Stack>

        {/* Video Grid Display layout */}
        <Videos videos={videos} />
      </Box>
    </Stack>
  );
};

export default Feed;
