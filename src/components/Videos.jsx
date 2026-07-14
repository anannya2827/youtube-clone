import { Box } from '@mui/material';
import VideoCard from './VideoCard';
import ChannelCard from './ChannelCard';

const Videos = ({ videos, direction }) => {
  if (!videos?.length) return <div style={{ color: '#aaa', padding: '20px' }}>Loading streaming elements...</div>;

  // Handles sidebar stack formatting within the player routing detail view layout
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

  return (
    // Beautiful, fully fluid grid framework that handles vertical and horizontal item wrapping smoothly
    <Box 
      sx={{ 
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
          xl: 'repeat(4, 1fr)'
        },
        gap: '24px 16px',
        width: '100%'
      }}
    >
      {videos.map((item, idx) => (
        <Box key={idx} sx={{ width: '100%' }}>
          {item.id?.videoId && <VideoCard video={item} />}
          {item.id?.channelId && <ChannelCard channelDetail={item} />}
        </Box>
      ))}
    </Box>
  );
};

export default Videos;
