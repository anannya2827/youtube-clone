import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Typography, Box, Stack } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import Videos from './Videos';

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  
  // Safely extract the video id param
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    if (!id) return;

    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => {
        if (data?.items && data.items.length > 0) {
          setVideoDetail(data.items[0]);
        }
      })
      .catch((err) => console.error("Error fetching video details:", err));

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data) => {
        if (data?.items) {
          setVideos(data.items);
        }
      })
      .catch((err) => console.error("Error fetching related videos:", err));
  }, [id]);

  if (!videoDetail?.snippet) {
    return (
      <Box minHeight="95vh" sx={{ backgroundColor: '#0f0f0f', p: 4 }}>
        <Typography color="#fff">Loading video player elements...</Typography>
      </Box>
    );
  }

  const { title, channelId, channelTitle, description } = videoDetail.snippet;
  const viewCount = videoDetail.statistics?.viewCount || "0";
  const likeCount = videoDetail.statistics?.likeCount || "0";

  return (
    <Box minHeight="95vh" sx={{ backgroundColor: '#0f0f0f', p: { xs: 2, md: 4 } }}>
      <Stack direction={{ xs: 'column', lg: 'row' }} gap={4}>
        
        {/* Left Column: Video Screen Player & Detailed Metadata */}
        <Box sx={{ flex: 1, maxWidth: { lg: '75%' } }}>
          <Box sx={{ width: '100%', position: 'relative', pt: '56.25%', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#000' }}>
            <ReactPlayer 
              url={`https://www.youtube.com/watch?v=${id}`} 
              className="react-player" 
              controls 
              width="100%"
              height="100%"
              style={{ position: 'absolute', top: 0, left: 0 }}
              playing={true} // Auto-plays the asset cleanly when mounting
            />
          </Box>
          
          <Typography color="#fff" variant="h6" fontWeight="bold" p={2} sx={{ fontSize: { xs: '16px', md: '20px' }, px: 0 }}>
            {title}
          </Typography>
          
          <Stack direction="row" justifyContent="space-between" sx={{ color: '#aaa' }} py={1} px={0}>
            <Link to={`/channel/${channelId}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#fff', display: 'flex', alignItems: 'center' }}>
                {channelTitle}
                <CheckCircleIcon sx={{ fontSize: '14px', color: '#aaa', ml: '5px' }} />
              </Typography>
            </Link>
            <Stack direction="row" gap="20px" alignItems="center">
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                {parseInt(viewCount).toLocaleString()} views
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                {parseInt(likeCount).toLocaleString()} likes
              </Typography>
            </Stack>
          </Stack>

          <Box sx={{ backgroundColor: '#212121', p: 2, borderRadius: '12px', mt: 2 }}>
            <Typography variant="body2" color="#fff" sx={{ whiteSpace: 'pre-wrap', lineHeight: '1.5rem' }}>
              {description}
            </Typography>
          </Box>
        </Box>

        {/* Right Column: Up Next Feed Stack */}
        <Box px={2} py={{ xs: 5, lg: 0 }} sx={{ width: { xs: '100%', lg: '25%' }, maxHeight: '90vh', overflowY: 'auto' }}>
          <Typography variant="h6" color="#fff" fontWeight="bold" mb={2}>
            Up Next
          </Typography>
          <Videos videos={videos} direction="column" />
        </Box>

      </Stack>
    </Box>
  );
};

export default VideoDetail;
