import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import Feed from './components/Feed';
import VideoDetail from './components/VideoDetail';
import ChannelDetail from './components/ChannelDetail';
import SearchFeed from './components/SearchFeed';

const App = () => {
  // Sidebar starts hidden (receded back) by default
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <BrowserRouter basename={process.env.NODE_ENV === 'production' ? '/youtube-clone' : ''}>
      <Box sx={{ backgroundColor: '#0f0f0f' }}>
        {/* Pass state triggers down to the header menu controls */}
        <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <Routes>
          <Route exact path="/" element={<Feed isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />} />
          <Route path="/video/:id" element={<VideoDetail />} />
          <Route path="/channel/:id" element={<ChannelDetail />} />
          <Route path="/search/:searchTerm" element={<SearchFeed />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
};

export default App;
