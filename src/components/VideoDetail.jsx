import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Typography, Box, Stack } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import Videos from './Videos';

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    window.scrollTo(0, 0);

    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => { 
        if (data?.items?.length) setVideoDetail(data.items[0]); 
      })
      .catch((err) => console.error(err));

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data) => { 
        if (data?.items) setVideos(data.items); 
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!videoDetail?.snippet) {
    return (
      <Box minHeight="95vh" p={4} sx={{ backgroundColor: '#0f0f0f' }}>
        <Typography color="white">Loading streaming components...</Typography>
      </Box>
    );
  }

  const { title, channelId, channelTitle, description } = videoDetail.snippet;
  const viewCount = videoDetail.statistics?.viewCount || "0";
  const likeCount = videoDetail.statistics?.likeCount || "0";

  return (
    <Box minHeight="95vh" sx={{ backgroundColor: '#0f0f0f', p: { xs: 2, md: 4 }, width: '100%', boxSizing: 'border-box' }}>
      <Stack direction={{ xs: 'column', lg: 'row' }} gap={4}>
        
        <Box sx={{ flex: 1, width: '100%' }}>
          <Box sx={{ width: '100%', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#000', aspectRatio: '16/9' }}>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${id}`}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ border: 'none' }}
            />
          </Box>
          
          <Typography color="#fff" variant="h6" fontWeight="bold" mt={2} mb={1} sx={{ fontSize: { xs: '16px', md: '20px' } }}>
            {title}
          </Typography>
          
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ color: '#aaa', mb: 2 }}>
            <Link to={`/channel/${channelId}`} style={{ textDecoration: 'none' }}>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#fff', display: 'flex', alignItems: 'center' }}>
                {channelTitle}
                <CheckCircleIcon sx={{ fontSize: '14px', color: '#aaa', ml: '5px' }} />
              </Typography>
            </Link>
            <Stack direction="row" gap="20px">
              <Typography variant="body2" sx={{ opacity: 0.7 }}>{parseInt(viewCount).toLocaleString()} views</Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>{parseInt(likeCount).toLocaleString()} likes</Typography>
            </Stack>
          </Stack>

          <Box sx={{ backgroundColor: '#212121', p: 2, borderRadius: '12px' }}>
            <Typography variant="body2" color="#fff" sx={{ whiteSpace: 'pre-wrap', lineHeight: '1.5rem' }}>
              {description}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ width: { xs: '100%', lg: '350px' }, flexShrink: 0 }}>
          <Typography variant="h6" color="#fff" fontWeight="bold" mb={2}>Related Videos</Typography>
          <Videos videos={videos} direction="column" />
        </Box>

      </Stack>
    </Box>
  );
};

export default VideoDetail;
