import { useState, useEffect, useRef } from 'react';
import { Box, Stack, Button, IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import Sidebar from './Sidebar';
import Videos from './Videos';

const tags = ['New', 'Music', 'Tech', 'Gaming', 'Cooking', 'Crafts', 'Sports', 'Live', 'Sci-Fi'];
const dynamicFallbacks = ['Trending World', 'New Clips', 'Popular Now', 'Viral Videos', 'Latest Uploads'];

const Feed = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [selectedCategory, setSelectedCategory] = useState('Home'); 
  const [videos, setVideos] = useState([]);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (selectedCategory === 'History') {
      const historyData = JSON.parse(localStorage.getItem('watchHistory')) || [];
      setVideos(historyData);
    } else {
      let searchQuery = selectedCategory === 'Home' ? 'New' : selectedCategory;
      
      if (selectedCategory === 'Home') {
        const randomIndex = Math.floor(Math.random() * dynamicFallbacks.length);
        searchQuery = dynamicFallbacks[randomIndex];
      }

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
    <Box sx={{ display: 'flex', width: '100%', height: '100%', position: 'relative', overflow: 'hidden', backgroundColor: '#0f0f0f' }}>
      
      {/* THE ONLY SIDEBAR: Securely fixed to the true left boundary wall */}
      <Box 
        sx={{ 
          position: 'absolute',
          top: 0,
          left: isSidebarOpen ? 0 : '-240px', 
          width: '240px',
          height: '100%',
          zIndex: 250, 
          transition: 'left 0.2s ease-in-out',
          backgroundColor: '#0f0f0f',
          boxShadow: isSidebarOpen ? '4px 0px 15px rgba(0,0,0,0.6)' : 'none'
        }}
      >
        <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      </Box>

      {/* Click-away backdrop layer */}
      {isSidebarOpen && (
        <Box 
          onClick={() => setIsSidebarOpen(false)} 
          sx={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 150 }} 
        />
      )}

      {/* Main Grid Feed Canvas - Completely free of floating menu blocks */}
      <Box p={3} sx={{ overflowY: 'auto', overflowX: 'hidden', flex: 1, height: '100%', boxSizing: 'border-box' }}>
        <Stack direction="row" alignItems="center" sx={{ position: 'relative', width: '100%', mb: 3 }}>
          <Stack 
            ref={scrollContainerRef}
            direction="row" 
            gap={1.5} 
            sx={{ overflowX: 'auto', whiteSpace: 'nowrap', width: '100%', pr: '50px', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}
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
          <IconButton onClick={handleScrollRight} sx={{ position: 'absolute', right: 0, backgroundColor: '#212121', color: 'white', '&:hover': { backgroundColor: '#3d3d3d' }, zIndex: 5 }}>
            <ArrowForwardIosIcon sx={{ fontSize: '14px', pl: '2px' }} />
          </IconButton>
        </Stack>

        <Box sx={{ width: '100%' }}>
          <Videos videos={videos} />
        </Box>
      </Box>
    </Box>
  );
};

export default Feed;
