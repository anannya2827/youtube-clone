import { useState, useEffect } from 'react';
import { Box, Stack, Button } from '@mui/material';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import Sidebar from './Sidebar';
import Videos from './Videos';

const tags = ['New', 'Music', 'Sports', 'Gaming', 'Fashion', 'Coding', 'Movies', 'News', 'Live', 'Crypto', 'Sci-Fi'];

const Feed = () => {
  // Setting a default tag ensures content loads instantly on mount
  const [selectedCategory, setSelectedCategory] = useState('Coding'); 
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // This fetches the default category automatically when the link is opened
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
      .then((data) => {
        if (data?.items) setVideos(data.items);
      })
      .catch((err) => console.error("Auto-fetch error: ", err));
  }, [selectedCategory]); // Triggers automatically when component mounts or category shifts

  return (
    <Stack sx={{ flexDirection: 'row', backgroundColor: '#0f0f0f' }}>
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <Sidebar />
      </Box>

      <Box p={2} sx={{ overflowY: 'auto', height: '92vh', flex: 1 }}>
        <Stack 
          direction="row" 
          gap={1.5} 
          sx={{ overflowX: 'auto', mb: 3, pb: 1, '&::-webkit-scrollbar': { height: '0px' } }}
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
                '&:hover': { backgroundColor: tag === selectedCategory ? 'white' : '#3d3d3d' }
              }}
            >
              {tag}
            </Button>
          ))}
        </Stack>

        <Videos videos={videos} />
      </Box>
    </Stack>
  );
};

export default Feed;
