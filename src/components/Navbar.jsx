import { Stack, Box, IconButton, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import MicIcon from '@mui/icons-material/Mic';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchBar from './SearchBar';

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => (
  <Stack 
    direction="row" 
    alignItems="center" 
    p={2} 
    sx={{ 
      position: 'sticky', 
      background: '#0f0f0f', 
      top: 0, 
      justifyContent: 'space-between', 
      zIndex: 300, 
      height: '56px', 
      borderBottom: '1px solid #212121' 
    }}
  >
    {/* Left Side: Hamburger Icon */}
    <Stack direction="row" alignItems="center" gap={1}>
      <IconButton sx={{ color: 'white' }} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        <MenuIcon />
      </IconButton>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '2px', textDecoration: 'none' }}>
        <img src="https://i.ibb.co/s9Qys2j/logo.png" alt="logo" height={22} />
        <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px', fontFamily: '"Oswald", sans-serif', letterSpacing: '-1px' }}>
          YouTube<span style={{ fontSize: '10px', color: '#aaa', marginLeft: '4px', verticalAlign: 'super' }}>IN</span>
        </span>
      </Link>
    </Stack>

    {/* Center Section: Search Bar */}
    <Stack direction="row" alignItems="center" gap={2} sx={{ flex: 1, justifyContent: 'center', maxWidth: '650px', mx: 2 }}>
      <Box sx={{ width: '100%', minWidth: '200px' }}>
        <SearchBar />
      </Box>
      <IconButton sx={{ backgroundColor: '#212121', color: 'white', display: { xs: 'none', sm: 'flex' }, '&:hover': { backgroundColor: '#3d3d3d' } }}>
        <MicIcon />
      </IconButton>
    </Stack>

    {/* Right Side Tools */}
    <Stack direction="row" alignItems="center" gap={1}>
      <IconButton sx={{ color: 'white' }}>
        <VideoCallIcon />
      </IconButton>
      <IconButton sx={{ color: 'white' }}>
        <NotificationsNoneIcon />
      </IconButton>
      <Button 
        variant="outlined" 
        startIcon={<AccountCircleIcon />}
        sx={{ 
          color: '#3ea6ff', 
          borderColor: '#3ea6ff', 
          borderRadius: '20px', 
          textTransform: 'none', 
          fontWeight: 'bold', 
          ml: 1, 
          '&:hover': { borderColor: '#3ea6ff', backgroundColor: 'rgba(62,166,255,0.1)' } 
        }}
      >
        Sign in
      </Button>
    </Stack>
  </Stack>
);

export default Navbar;
