import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import Feed from './components/Feed';
import VideoDetail from './components/VideoDetail';
import ChannelDetail from './components/ChannelDetail';
import SearchFeed from './components/SearchFeed';

const App = () => {
  // Sidebar starts completely hidden by default
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <BrowserRouter basename={process.env.NODE_ENV === 'production' ? '/youtube-clone' : ''}>
      <Box sx={{ backgroundColor: '#0f0f0f', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Shares toggle hooks directly across children components */}
        <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        
        <Box sx={{ flex: 1, display: 'flex', position: 'relative', overflow: 'hidden', height: 'calc(100vh - 56px)' }}>
          <Routes>
            <Route path="/" element={<Feed isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />} />
            {/* Direct structural routing mapping parameter block handles stable playback actions */}
            <Route path="/video/:id" element={<VideoDetail />} />
            <Route path="/channel/:id" element={<ChannelDetail />} />
            <Route path="/search/:searchTerm" element={<SearchFeed />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
};

export default App;
