import { useRef } from 'react';
import { Box, IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import VideoCard from './VideoCard';
import ChannelCard from './ChannelCard';

const Videos = ({ videos, direction }) => {
  const rowScrollRef = useRef(null);
  if (!videos?.length) return <div style={{ color: '#aaa', padding: '20px' }}>Loading video layout...</div>;

  // If direction is column (like the Video Detail layout sidebar), render simple list stacking
  if (direction === 'column') {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
        {videos.map((item, idx) => (
          <Box key={idx} sx={{ width: '100%' }}>
            {item.id?.videoId && <VideoCard video={item} />}
            {item.id?.channelId && <ChannelCard channelDetail={item} />}
          </Box>
        ))}
      </Box>
    );
  }

  // Horizontal Scroll Handler for Video Feed Grid Rows
  const scrollRowRight = () => {
    if (rowScrollRef.current) {
      rowScrollRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center' }}>
      {/* Horizontally Scrollable Container Row Wrapper */}
      <Box
        ref={rowScrollRef}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '16px',
          overflowX: 'auto',
          width: '100%',
          pb: 2,
          scrollbarWidth: 'none', // Firefox
          '&::-webkit-scrollbar': { display: 'none' }, // Safari & Chrome
          msOverflowStyle: 'none', // IE/Edge
        }}
      >
        {videos.map((item, idx) => (
          <Box 
            key={idx} 
            sx={{ 
              width: '300px', 
              minWidth: '300px', // Prevents shrinking elements out of view boundaries
              flexShrink: 0 
            }}
          >
            {item.id?.videoId && <VideoCard video={item} />}
            {item.id?.channelId && <ChannelCard channelDetail={item} />}
          </Box>
        ))}
      </Box>

      {/* Rightmost Floating Scroll Indicator Button ('>') */}
      <IconButton
        onClick={scrollRowRight}
        sx={{
          position: 'absolute',
          right: -10,
          backgroundColor: 'rgba(33, 33, 33, 0.85)',
          color: 'white',
          boxShadow: '0px 4px 10px rgba(0,0,0,0.5)',
          '&:hover': { backgroundColor: '#3d3d3d' },
          zIndex: 10,
          height: '40px',
          width: '40px'
        }}
      >
        <ArrowForwardIosIcon sx={{ fontSize: '14px', pl: '2px' }} />
      </IconButton>
    </Box>
  );
};

export default Videos;
