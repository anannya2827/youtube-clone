import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Box, Stack, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Videos from './Videos';
import { fetchFromAPI } from '../utils/fetchFromAPI';

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => setVideoDetail(data.items[0]));

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data) => setVideos(data.items));
  }, [id]);

  if (!videoDetail?.snippet) return <Typography color="#fff" p={5}>Loading Video...</Typography>;

  const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: 'column', md: 'row' }}>
        <Box flex={1}>
          <Box sx={{ width: '100%', position: 'sticky', top: '86px', p: 2 }}>
            <iframe 
              src={`https://www.youtube.com/embed/${id}`} 
              title={title}
              style={{ width: '100%', height: '70vh', border: 'none', borderRadius: '12px' }}
              allowFullScreen
            />
            <Typography color="#fff" variant="h5" fontWeight="bold" mt={2}>
              {title}
            </Typography>
            <Stack direction="row" justifyContent="space-between" sx={{ color: '#fff' }} py={1}>
              <Link to={`/channel/${channelId}`} style={{ textDecoration: 'none' }}>
                <Typography variant="h6" color="#fff" display="flex" alignItems="center">
                  {channelTitle}
                  <CheckCircleIcon sx={{ fontSize: '14px', color: 'gray', ml: '5px' }} />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center" sx={{ maxWidth: { md: '400px' } }}>
          <Typography variant="h6" fontWeight="bold" mb={2} color="#fff">Related Videos</Typography>
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;