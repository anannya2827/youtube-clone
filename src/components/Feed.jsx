import { useState, useEffect, useRef } from 'react';
import { Box, Stack, Button, IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import Sidebar from './Sidebar';
import Videos from './Videos';

const tags = ['New', 'Music', 'Tech', 'Gaming', 'Cooking', 'Crafts', 'Sports', 'Live', 'Sci-Fi'];

const Feed = ({ isSidebarOpen }) => {
  const [selectedCategory, setSelectedCategory] = useState('Home'); 
  const [videos, setVideos] = useState([]);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (selectedCategory === 'History') {
      const historyData = JSON.parse(localStorage.getItem('watchHistory')) || [];
      setVideos(historyData);
    } else {
      const searchQuery = selectedCategory === 'Home' ? 'New' : selectedCategory;
      fetchFromAPI(`search?part=snippet&q=${searchQuery}`)
        .then((data) => { if (data?.items) setVideos(data.items); })
        .catch((err) => console.error(err));
    }
  }, [selectedCategory]);

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <Stack direction="row" sx={{ backgroundColor: '#0f0f0f', height: 'calc(100vh - 56px)', overflow: 'hidden', position: 'relative' }}>
      
      {/* Sidebar fixed to the extreme left panel boundary */}
      <Box 
        sx={{ 
          width: isSidebarOpen ? '240px' : '0px',
          minWidth: isSidebarOpen ? '240px' : '0px',
          transition: 'all 0.2s ease-in-out',
          overflow: 'hidden',
          backgroundColor: '#0f0f0f',
          zIndex: 95
        }}
      >
        <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      </Box>

      {/* Main Container Area */}
      <Box p={3} sx={{ overflowY: 'auto', flex: 1, height: '100%', boxSizing: 'border-box' }}>
        
        {/* Chips Categories Navigation Row */}
        <Stack direction="row" alignItems="center" sx={{ position: 'relative', width: '100%', mb: 3 }}>
          <Stack 
            ref={scrollContainerRef}
            direction="row" 
            gap={1.5} 
            sx={{ 
              overflowX: 'auto', 
              whiteSpace: 'nowrap',
              width: '100%',
              pr: '50px',
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

          <IconButton 
            onClick={handleScrollRight}
            sx={{ 
              position: 'absolute', 
              right: 0, 
              backgroundColor: '#212121', 
              color: 'white',
              '&:hover': { backgroundColor: '#3d3d3d' },
              zIndex: 5
            }}
          >
            <ArrowForwardIosIcon sx={{ fontSize: '14px', pl: '2px' }} />
          </IconButton>
        </Stack>

        {/* Video Grid Feed layout display matrix */}
        <Box sx={{ width: '100%' }}>
          <Videos videos={videos} />
        </Box>
      </Box>
    </Stack>
  );
};

export default Feed;
