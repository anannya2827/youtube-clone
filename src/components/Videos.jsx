import { Box } from '@mui/material';
import VideoCard from './VideoCard';
import ChannelCard from './ChannelCard';

const Videos = ({ videos, direction }) => {
  if (!videos?.length) return <div style={{ color: '#aaa', padding: '20px' }}>Loading feeds...</div>;
  
  return (
    <Box 
      sx={{ 
        display: 'grid',
        // If direction is row (like on video detail sidebar), stack them vertically in 1 column. 
        // Otherwise, render a fluid grid layout for the homepage feed.
        gridTemplateColumns: direction === 'column' 
          ? '1fr' 
          : { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' },
        gap: '24px 16px',
        width: '100%'
      }}
    >
      {videos.map((item, idx) => (
        <Box key={idx} sx={{ width: '100%' }}>
          {item.id.videoId && <VideoCard video={item} />}
          {item.id.channelId && <ChannelCard channelDetail={item} />}
        </Box>
      ))}
    </Box>
  );
};

export default Videos;
