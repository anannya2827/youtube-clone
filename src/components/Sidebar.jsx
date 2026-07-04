import { Stack, Typography, Divider, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import HistoryIcon from '@mui/icons-material/History';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';

const Sidebar = () => {
  const renderRow = (icon, text, isActive = false) => (
    <Stack
      direction="row"
      alignItems="center"
      gap={3}
      sx={{
        backgroundColor: isActive ? '#212121' : 'transparent',
        padding: '10px 24px',
        borderRadius: '10px',
        cursor: 'pointer',
        width: '100%',
        '&:hover': { backgroundColor: '#212121' }
      }}
    >
      <span style={{ color: 'white', display: 'flex', alignItems: 'center' }}>{icon}</span>
      <Typography variant="body2" sx={{ color: 'white', fontWeight: isActive ? 'bold' : 'normal' }}>
        {text}
      </Typography>
    </Stack>
  );

  return (
    <Box sx={{ width: '240px', height: '92vh', overflowY: 'auto', pr: 1, pt: 1 }}>
      {/* Section 1 */}
      {renderRow(<HomeIcon />, 'Home', true)}
      {renderRow(<ExploreIcon />, 'Explore')}
      {renderRow(<SubscriptionsIcon />, 'Subscriptions')}
      
      <Divider sx={{ borderColor: '#3d3d3d', my: 1.5 }} />

      {/* Section 2: You */}
      <Typography variant="subtitle2" sx={{ color: 'white', px: 3, fontWeight: 'bold', mb: 1 }}>You</Typography>
      {renderRow(<VideoLibraryIcon />, 'Library')}
      {renderRow(<HistoryIcon />, 'History')}

      <Divider sx={{ borderColor: '#3d3d3d', my: 1.5 }} />

      {/* Section 3: Explore Options */}
      <Typography variant="subtitle2" sx={{ color: 'white', px: 3, fontWeight: 'bold', mb: 1 }}>Explore</Typography>
      {renderRow(<WhatshotIcon />, 'Trending')}
      {renderRow(<MusicNoteIcon />, 'Music')}
      {renderRow(<SportsEsportsIcon />, 'Gaming')}
      {renderRow(<EmojiEventsIcon />, 'Sports')}
      {renderRow(<LocalMoviesIcon />, 'Movies')}
    </Box>
  );
};

export default Sidebar;
