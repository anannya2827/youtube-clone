import { Box } from '@mui/material';
import VideoCard from './VideoCard';
import ChannelCard from './ChannelCard';

const Videos = ({ videos, direction }) => {
  if (!videos?.length) {
    return <div style={{ color: '#aaa', padding: '20px' }}>Loading streaming elements...</div>;
  }

  // Handles sidebar lists inside the Player routing detail layout
  if (direction === 'column') {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
        {videos.map((item, idx) => (
          <Box key={idx} sx={{ width: '100%' }}>
            {(item.id?.videoId || typeof item.id === 'string') && <VideoCard video={item} />}
            {item.id?.channelId && <ChannelCard channelDetail={item} />}
          </Box>
        ))}
      </Box>
    );
  }

  return (
    // Explicit full responsive layout grid wrapper handles massive card volumes cleanly
    <Box 
      sx={{ 
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',           // 1 card on tiny mobile screens
          sm: 'repeat(2, 1fr)', // 2 cards on larger mobile/tablets
          md: 'repeat(3, 1fr)', // 3 cards on desktop monitors
          lg: 'repeat(4, 1fr)'  // 4 cards on massive display panels
        },
        gap: '24px 16px',      // Vertical and horizontal spacing between items
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      {videos.map((item, idx) => (
        <Box key={idx} sx={{ width: '100%' }}>
          {/* Support standard video layout items and mock backup identifiers cleanly */}
          {(item.id?.videoId || typeof item.id === 'string' || item.id?.playlistId) && (
            <VideoCard video={item} />
          )}
          {item.id?.channelId && (
            <ChannelCard channelDetail={item} />
          )}
        </Box>
      ))}
    </Box>
  );
};

export default Videos;
