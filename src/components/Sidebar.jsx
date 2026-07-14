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

const Sidebar = ({ selectedCategory, setSelectedCategory }) => {
  const renderRow = (name, icon) => {
    const isActive = name === selectedCategory;
    return (
      <button
        key={name}
        onClick={() => setSelectedCategory(name)}
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
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', color: 'white' }}>{icon}</span>
        <Typography variant="body2" sx={{ color: 'white', fontWeight: isActive ? 'bold' : 'normal' }}>
          {name}
        </Typography>
      </button>
    );
  };

  return (
    <Box 
      sx={{ 
        width: '240px', 
        height: '100%', 
        overflowY: 'auto', 
        backgroundColor: '#0f0f0f', 
        borderRight: '1px solid #212121', 
        pt: 1,
        boxSizing: 'border-box'
      }}
    >
      {renderRow('Home', <HomeIcon />)}
      <Divider sx={{ borderColor: '#3d3d3d', my: 1.5 }} />
      <Typography variant="subtitle2" sx={{ color: '#aaa', px: 3, fontWeight: 'bold', mb: 1, fontSize: '11px' }}>MY MIX</Typography>
      {renderRow('Music', <MusicNoteIcon />)}
      {renderRow('Tech', <LaptopMacIcon />)}
      {renderRow('Gaming', <SportsEsportsIcon />)}
      {renderRow('Cooking', <RestaurantIcon />)}
      {renderRow('Crafts', <BrushIcon />)}
      <Divider sx={{ borderColor: '#3d3d3d', my: 1.5 }} />
      <Typography variant="subtitle2" sx={{ color: '#aaa', px: 3, fontWeight: 'bold', mb: 1, fontSize: '11px' }}>YOU</Typography>
      {renderRow('Library', <VideoLibraryIcon />)}
      {renderRow('History', <HistoryIcon />)}
      <Divider sx={{ borderColor: '#3d3d3d', my: 1.5 }} />
      <Typography variant="subtitle2" sx={{ color: '#aaa', px: 3, fontWeight: 'bold', mb: 1, fontSize: '11px' }}>EXPLORE</Typography>
      {renderRow('Trending', <WhatshotIcon />)}
      {renderRow('Sports', <EmojiEventsIcon />)}
    </Box>
  );
};

export default Sidebar;
