import { Stack, Typography, Divider, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import BrushIcon from '@mui/icons-material/Brush';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import HistoryIcon from '@mui/icons-material/History';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

// Structured list combining core utility pages with your exact customized topic streams
const mainCategories = [
  { name: 'Home', icon: <HomeIcon /> },
];

const customTopics = [
  { name: 'Music', icon: <MusicNoteIcon /> },
  { name: 'Tech', icon: <LaptopMacIcon /> },
  { name: 'Gaming', icon: <SportsEsportsIcon /> },
  { name: 'Cooking', icon: <RestaurantIcon /> },
  { name: 'Crafts', icon: <BrushIcon /> },
];

const libraryCategories = [
  { name: 'Library', icon: <VideoLibraryIcon /> },
  { name: 'History', icon: <HistoryIcon /> },
];

const exploreCategories = [
  { name: 'Trending', icon: <WhatshotIcon /> },
  { name: 'Sports', icon: <EmojiEventsIcon /> },
];

const Sidebar = ({ selectedCategory, setSelectedCategory }) => {
  const renderRow = (category) => {
    const isActive = category.name === selectedCategory;
    return (
      <button
        key={category.name}
        onClick={() => setSelectedCategory(category.name)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          width: '100%',
          padding: '10px 24px',
          borderRadius: '10px',
          border: 'none',
          cursor: 'pointer',
          backgroundColor: isActive ? '#212121' : 'transparent',
          color: 'white',
          textAlign: 'left',
          transition: 'background-color 0.2s ease',
        }}
        onMouseEnter={(e) => { if(!isActive) e.currentTarget.style.backgroundColor = '#212121'; }}
        onMouseLeave={(e) => { if(!isActive) e.currentTarget.style.backgroundColor = 'transparent'; }}
      >
        <span style={{ display: 'flex', alignItems: 'center', color: 'white' }}>{category.icon}</span>
        <Typography variant="body2" sx={{ color: 'white', fontWeight: isActive ? 'bold' : 'normal', textTransform: 'none' }}>
          {category.name}
        </Typography>
      </button>
    );
  };

  return (
    <Box 
      sx={{ 
        width: '240px', 
        height: 'calc(100vh - 56px)', // Fixes sidebar height perfectly to avoid viewport overflow
        position: 'sticky',
        top: '56px',
        overflowY: 'auto', // Enables clean standard scroll within the sidebar boundaries
        pr: 1, 
        pt: 1,
        backgroundColor: '#0f0f0f',
        borderRight: '1px solid #212121',
        boxSizing: 'border-box'
      }}
    >
      {/* Main Core Section */}
      {mainCategories.map(renderRow)}
      
      <Divider sx={{ borderColor: '#3d3d3d', my: 1.5 }} />

      {/* Your Customized Stream Feed Topics */}
      <Typography variant="subtitle2" sx={{ color: '#aaa', px: 3, fontWeight: 'bold', mb: 1, textTransform: 'uppercase', fontSize: '11px' }}>My Mix</Typography>
      {customTopics.map(renderRow)}

      <Divider sx={{ borderColor: '#3d3d3d', my: 1.5 }} />

      {/* You Section */}
      <Typography variant="subtitle2" sx={{ color: '#aaa', px: 3, fontWeight: 'bold', mb: 1, textTransform: 'uppercase', fontSize: '11px' }}>You</Typography>
      {libraryCategories.map(renderRow)}

      <Divider sx={{ borderColor: '#3d3d3d', my: 1.5 }} />

      {/* Explore Section */}
      <Typography variant="subtitle2" sx={{ color: '#aaa', px: 3, fontWeight: 'bold', mb: 1, textTransform: 'uppercase', fontSize: '11px' }}>Explore</Typography>
      {exploreCategories.map(renderRow)}
    </Box>
  );
};

export default Sidebar;
