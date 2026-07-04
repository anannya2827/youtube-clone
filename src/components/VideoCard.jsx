import { Link } from 'react-router-dom';
import { Typography, Card, CardContent, CardMedia } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const VideoCard = ({ video: { id: { videoId }, snippet } }) => (
  <Card sx={{ width: { xs: '100%', sm: '358px', md: '320px' }, boxShadow: 'none', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#1E1E1E' }}>
    <Link to={videoId ? `/video/${videoId}` : `/video/cV2gBU6hK34`}>
      <CardMedia 
        image={snippet?.thumbnails?.high?.url} 
        alt={snippet?.title} 
        sx={{ width: { xs: '100%', sm: '358px', md: '320px' }, height: 180 }} 
      />
    </Link>
    <CardContent sx={{ height: '106px', padding: '12px' }}>
      <Link to={videoId ? `/video/${videoId}` : `/video/cV2gBU6hK34`} style={{ textDecoration: 'none' }}>
        <Typography variant="subtitle1" fontWeight="bold" color="#FFF" sx={{ textDecoration: 'none' }}>
          {snippet?.title.slice(0, 60)}
        </Typography>
      </Link>
      <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : ''} style={{ textDecoration: 'none' }}>
        <Typography variant="subtitle2" color="gray" display="flex" alignItems="center" mt={1}>
          {snippet?.channelTitle}
          <CheckCircleIcon sx={{ fontSize: '12px', color: 'gray', ml: '5px' }} />
        </Typography>
      </Link>
    </CardContent>
  </Card>
);

export default VideoCard;