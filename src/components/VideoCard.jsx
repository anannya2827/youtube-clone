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
      {/* Main Title - Pure White */}
      <Link to={videoId ? `/video/${videoId}` : `/video/cV2gBU6hK34`} style={{ textDecoration: 'none' }}>
        <Typography variant="subtitle1" fontWeight="bold" color="#FFF" sx={{ lineHeight: '1.4rem' }}>
          {snippet?.title.slice(0, 60)}
        </Typography>
      </Link>
      
      {/* Channel & Meta Info - Styled with clear Off-White to prevent browser link-blue overrides */}
      <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : ''} style={{ textDecoration: 'none' }}>
        <Typography 
          variant="subtitle2" 
          display="flex" 
          alignItems="center" 
          mt={0.5}
          sx={{ color: '#aaa', '&:hover': { color: '#fff' } }} // Clean off-white color overrides link blue
        >
          {snippet?.channelTitle}
          <CheckCircleIcon sx={{ fontSize: '12px', color: '#aaa', ml: '5px' }} />
        </Typography>
      </Link>
    </CardContent>
  </Card>
);

export default VideoCard;
