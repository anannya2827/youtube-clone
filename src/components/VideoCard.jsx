import { Link } from 'react-router-dom';
import { Typography, Card, CardContent, CardMedia } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const VideoCard = ({ video }) => {
  // Extract id parameters across different search/video list shapes cleanly
  const videoId = video?.id?.videoId || video?.id;
  const snippet = video?.snippet;

  if (!videoId || typeof videoId !== 'string') return null; 

  const handleAddToHistory = () => {
    try {
      const existingHistory = JSON.parse(localStorage.getItem('watchHistory')) || [];
      const filteredHistory = existingHistory.filter((item) => {
        const idToCheck = item?.id?.videoId || item?.id;
        return idToCheck !== videoId;
      });
      const updatedHistory = [{ id: videoId, snippet }, ...filteredHistory];
      localStorage.setItem('watchHistory', JSON.stringify(updatedHistory));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card sx={{ width: '100%', boxShadow: 'none', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#0f0f0f' }}>
      <Link to={`/video/${videoId}`} onClick={handleAddToHistory}>
        <CardMedia 
          image={snippet?.thumbnails?.high?.url || snippet?.thumbnails?.medium?.url} 
          alt={snippet?.title} 
          sx={{ width: '100%', height: 180, borderRadius: '12px', transition: 'transform 0.2s ease', '&:hover': { transform: 'scale(1.02)' } }} 
        />
      </Link>
      <CardContent sx={{ padding: '12px 4px', backgroundColor: '#0f0f0f' }}>
        <Link to={`/video/${videoId}`} onClick={handleAddToHistory} style={{ textDecoration: 'none', color: '#ffffff' }}>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#ffffff', lineHeight: '1.4rem', fontSize: '14px' }}>
            {snippet?.title ? snippet.title.slice(0, 60) : ''}
          </Typography>
        </Link>
        <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : ''} style={{ textDecoration: 'none', color: '#aaaaaa' }}>
          <Typography variant="subtitle2" display="flex" alignItems="center" mt={0.5} sx={{ color: '#aaaaaa', fontSize: '12px', '&:hover': { color: '#ffffff' } }}>
            {snippet?.channelTitle}
            <CheckCircleIcon sx={{ fontSize: '12px', color: '#aaaaaa', ml: '5px' }} />
          </Typography>
        </Link>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
