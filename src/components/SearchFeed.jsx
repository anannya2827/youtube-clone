import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import Videos from './Videos';

const SearchFeed = () => {
  const [videos, setVideos] = useState([]);
  const { searchTerm } = useParams();

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`)
      .then((data) => setVideos(data.items))
      .catch((err) => console.error(err));
  }, [searchTerm]);

  return (
    <Box p={3} sx={{ overflowY: 'auto', height: '90vh', backgroundColor: '#0f0f0f', boxSizing: 'border-box' }}>
      {/* Search Header Result Title */}
      <Typography variant="h5" fontWeight="bold" mb={3} sx={{ color: 'white' }}>
        Search Results for: <span style={{ color: '#F31503' }}>{searchTerm}</span>
      </Typography>

      {/* Renders the videos grid directly without placeholder alert texts */}
      <Videos videos={videos} />
    </Box>
  );
};

export default SearchFeed;
