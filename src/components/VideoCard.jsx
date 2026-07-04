import { Link } from 'react-router-dom';
import { Typography, Card, CardContent, CardMedia } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const VideoCard = ({ video: { id: { videoId }, snippet } }) => (
  <Card sx={{ width: { xs: '100%', sm: '358px', md: '320px' }, boxShadow: 'none', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#0f0f0f' }}>
    <Link to={videoId ? `/video/${videoId}` : `/video/cV2gBU6hK34`}>
      <CardMedia 
        image={snippet?.thumbnails?.high?.url} 
        alt={snippet?.title} 
        sx={{ width: { xs: '100%', sm: '358px', md: '320px' }, height: 180, borderRadius: '12px' }} 
      />
    </Link>
    <CardContent sx={{ padding: '12px 4px', backgroundColor: '#0f0f0f' }}>
      
      {/* 1. Main Title - Inline styles to absolutely block link blue */}
      <Link 
        to={videoId ? `/video/${videoId}` : `/video/cV2gBU6hK34`} 
        style={{ textDecoration: 'none', color: '#ffffff' }}
      >
        <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#ffffff', lineHeight: '1.4rem' }}>
          {snippet?.title.slice(0, 60)}
        </Typography>
      </Link>
      
      {/* 2. Channel & Description Meta - Pure Off-White Inline Style */}
      <Link 
        to={snippet?.channelId ? `/channel/${snippet?.channelId}` : ''} 
        style={{ textDecoration: 'none', color: '#aaaaaa' }}
      >
        <Typography 
          variant="subtitle2" 
          display="flex" 
          alignItems="center" 
          mt={0.5}
          sx={{ color: '#aaaaaa', '&:hover': { color: '#ffffff' } }} 
        >
          {snippet?.channelTitle}
          <CheckCircleIcon sx={{ fontSize: '12px', color: '#aaaaaa', ml: '5px' }} />
        </Typography>
      </Link>

    </CardContent>
  </Card>
);

export default VideoCard;
