import { Stack } from '@mui/material';
// Importing the exact icons for your new categories
import HomeIcon from '@mui/icons-material/Home';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import BrushIcon from '@mui/icons-material/Brush';

const categories = [
  { name: 'New', icon: <HomeIcon /> },
  { name: 'Music', icon: <MusicNoteIcon /> },
  { name: 'Tech', icon: <LaptopMacIcon /> },
  { name: 'Gaming', icon: <SportsEsportsIcon /> },
  { name: 'Cooking', icon: <RestaurantIcon /> },
  { name: 'Crafts', icon: <BrushIcon /> },
];

const Sidebar = ({ selectedCategory, setSelectedCategory }) => (
  <Stack
    direction="row"
    sx={{
      overflowY: 'auto',
      height: { sx: 'auto', md: '95%' },
      flexDirection: { md: 'column' },
    }}
  >
    {categories.map((category) => (
      <button
        onClick={() => setSelectedCategory(category.name)}
        style={{
          background: category.name === selectedCategory ? '#FC1503' : 'transparent',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          borderRadius: '20px',
          margin: '5px 10px',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
        key={category.name}
      >
        <span style={{ color: category.name === selectedCategory ? 'white' : '#FC1503', display: 'flex', alignItems: 'center' }}>
          {category.icon}
        </span>
        <span style={{ opacity: category.name === selectedCategory ? '1' : '0.8', fontWeight: '500' }}>
          {category.name}
        </span>
      </button>
    ))}
  </Stack>
);

export default Sidebar;