import { Stack, Box } from '@mui/material';
import VideoCard from './VideoCard';
import ChannelCard from './ChannelCard';

const Videos = ({ videos }) => {
  if (!videos?.length) return <div style={{ color: 'white', padding: '20px' }}>Loading...</div>;
  
  return (
    <Stack 
      direction="row" 
      flexWrap="wrap" 
      justifyContent="start" 
      alignItems="start"
      gap={2}
      sx={{ width: '100%' }}
    >
      {videos.map((item, idx) => (
        <Box 
          key={idx} 
          sx={{ 
            width: { xs: '100%', sm: 'calc(50% - 8px)', md: 'calc(33.33% - 11px)', lg: 'calc(25% - 12px)' },
            minWidth: '280px',
            flexGrow: 0,
            flexShrink: 0
          }}
        >
          {item.id.videoId && <VideoCard video={item} />}
          {item.id.channelId && <ChannelCard channelDetail={item} />}
        </Box>
      ))}
    </Stack>
  );
};

export default Videos;
