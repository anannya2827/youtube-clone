import { Link } from 'react-router-dom';
import { Typography, Card, CardContent, CardMedia } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const VideoCard = ({ video }) => {
  const videoId = video?.id?.videoId || 'cV2gBU6hK34';
  const snippet = video?.snippet;

  const handleAddToHistory = () => {
    try {
      const existingHistory = JSON.parse(localStorage.getItem('watchHistory')) || [];
      // Filter out duplicate entries of the same video
      const filteredHistory = existingHistory.filter((item) => item.id.videoId !== videoId);
      
      // Add the latest watched video to the front of the list
      const updatedHistory = [{ id: { videoId }, snippet }, ...filteredHistory];
      localStorage.setItem('watchHistory', JSON.stringify(updatedHistory));
    } catch (error) {
      console.error("Error saving to watch history:", error);
    }
  };

  return (
    <Card sx={{ width: '100%', boxShadow: 'none', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#0f0f0f' }}>
      <Link to={`/video/${videoId}`} onClick={handleAddToHistory}>
        <CardMedia 
          image={snippet?.thumbnails?.high?.url} 
          alt={snippet?.title} 
          sx={{ width: '100%', height: 180, borderRadius: '12px' }} 
        />
      </Link>
      <CardContent sx={{ padding: '12px 4px', backgroundColor: '#0f0f0f' }}>
        <Link to={`/video/${videoId}`} onClick={handleAddToHistory} style={{ textDecoration: 'none', color: '#ffffff' }}>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#ffffff', lineHeight: '1.4rem' }}>
            {snippet?.title ? snippet.title.slice(0, 60) : ''}
          </Typography>
        </Link>
        <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : ''} style={{ textDecoration: 'none', color: '#aaaaaa' }}>
          <Typography variant="subtitle2" display="flex" alignItems="center" mt={0.5} sx={{ color: '#aaaaaa', '&:hover': { color: '#ffffff' } }}>
            {snippet?.channelTitle}
            <CheckCircleIcon sx={{ fontSize: '12px', color: '#aaaaaa', ml: '5px' }} />
          </Typography>
        </Link>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
