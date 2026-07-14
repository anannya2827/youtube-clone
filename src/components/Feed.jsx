import { useState, useEffect, useRef } from 'react';
import { Box, Stack, Button, IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import Sidebar from './Sidebar';
import Videos from './Videos';

const tags = ['New', 'Music', 'Tech', 'Gaming', 'Cooking', 'Crafts', 'Sports', 'Live', 'Sci-Fi'];

const Feed = ({ isSidebarOpen, setIsSidebarOpen }) => {
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

  // Handler to scroll the categories horizontal container to the right
  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ backgroundColor: '#0f0f0f', height: 'calc(100vh - 56px)', position: 'relative', overflow: 'hidden' }}>
      
      <Box sx={{ position: 'absolute', top: 0, left: isSidebarOpen ? 0 : '-240px', height: '100%', zIndex: 90, transition: 'left 0.3s ease-in-out' }}>
        <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      </Box>

      {isSidebarOpen && (
        <Box onClick={() => setIsSidebarOpen(false)} sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 80 }} />
      )}

      <Box p={3} sx={{ overflowY: 'auto', overflowX: 'hidden', height: '100%', boxSizing: 'border-box', width: '100%' }}>
        
        {/* Category Row with a Dynamic Right Arrow Scroll Trigger */}
        <Stack direction="row" alignItems="center" sx={{ position: 'relative', width: '100%', mb: 3 }}>
          <Stack 
            ref={scrollContainerRef}
            direction="row" 
            gap={1.5} 
            sx={{ 
              overflowX: 'auto', 
              whiteSpace: 'nowrap',
              width: '100%',
              pr: '50px', // Prevents button overlapping the last chip element
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

          {/* Dynamic Scroll Right Button ('>') */}
          <IconButton 
            onClick={handleScrollRight}
            sx={{ 
              position: 'absolute', 
              right: 0, 
              backgroundColor: '#212121', 
              color: 'white',
              boxShadow: 'left',
              '&:hover': { backgroundColor: '#3d3d3d' },
              zIndex: 5
            }}
          >
            <ArrowForwardIosIcon sx={{ fontSize: '14px', pl: '2px' }} />
          </IconButton>
        </Stack>

        <Box sx={{ width: '100%' }}>
          {selectedCategory === 'History' && videos.length === 0 ? (
            <Typography variant="body1" color="#aaa" sx={{ p: 2 }}>No watch history found. Start playing videos to view them here!</Typography>
          ) : (
            <Videos videos={videos} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Feed;
