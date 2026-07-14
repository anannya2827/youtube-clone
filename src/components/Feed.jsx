
const tags = ['New', 'Music', 'Tech', 'Gaming', 'Cooking', 'Crafts', 'Sports', 'Live', 'Sci-Fi'];

// Diverse rotating search matrices to guarantee completely distinct video structures on every load
const dynamicKeywords = [
  'International Music Festivals',
  'Latest Technology Innovations',
  'Popular Gaming Streams',
  'Trending World News',
  'Satisfying ASMR Crafts',
  'Live Sports Highlights',
  'Advanced Space Science'
];

const Feed = ({ isSidebarOpen, setIsSidebarOpen }) => {
const [selectedCategory, setSelectedCategory] = useState('New'); 
const [videos, setVideos] = useState([]);
@@ -17,16 +28,22 @@
const historyData = JSON.parse(localStorage.getItem('watchHistory')) || [];
setVideos(historyData);
} else {
      // Clean query text selector to ensure the YouTube API returns heavy result loads
      const queryParam = selectedCategory === 'Home' ? 'New' : selectedCategory;
      let activeQuery = selectedCategory;

      // When accessing 'New' or 'Home', pick a random query index to make the feed truly dynamic
      if (selectedCategory === 'New' || selectedCategory === 'Home') {
        const randomIndex = Math.floor(Math.random() * dynamicKeywords.length);
        activeQuery = dynamicKeywords[randomIndex];
      }

      fetchFromAPI(`search?part=snippet&q=${queryParam}`)
      // Live search payload fetching up to 50 items dynamically
      fetchFromAPI(`search?part=snippet&q=${encodeURIComponent(activeQuery)}&type=video`)
.then((data) => { 
          if (data?.items && data.items.length > 0) {
          if (data?.items) {
setVideos(data.items); 
}
})
        .catch((err) => console.error("Error updating feed criteria: ", err));
        .catch((err) => console.error("Error updating fluid feed matrix: ", err));
}
}, [selectedCategory]);

@@ -39,7 +56,7 @@
return (
<Box sx={{ display: 'flex', width: '100%', height: '100%', position: 'relative', overflow: 'hidden', backgroundColor: '#0f0f0f' }}>

      {/* Absolute Sliding Left Drawer Sidebar */}
      {/* Absolute Sliding Left Sidebar */}
<Box 
sx={{ 
position: 'absolute',
@@ -63,10 +80,10 @@
/>
)}

      {/* Main Layout Video Display Workstation Canvas */}
      {/* Main Multi-Column Viewport Workspace */}
<Box p={3} sx={{ overflowY: 'auto', overflowX: 'hidden', flex: 1, height: '100%', boxSizing: 'border-box' }}>

        {/* Horizontal Category Tag Filters Chips Section */}
        {/* Category Filter Chips Carousel */}
<Stack direction="row" alignItems="center" sx={{ position: 'relative', width: '100%', mb: 3 }}>
<Stack 
ref={scrollContainerRef}
@@ -75,7 +92,7 @@
sx={{ overflowX: 'auto', whiteSpace: 'nowrap', width: '100%', pr: '50px', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}
>
{tags.map((tag) => {
              const isTagActive = tag === selectedCategory || (tag === 'New' && selectedCategory === 'Home');
              const isTagActive = tag === selectedCategory;
return (
<Button
key={tag}
@@ -102,13 +119,13 @@
</IconButton>
</Stack>

        {/* High-density grid display matrix box container */}
        {/* Dynamic Responsive Grid Matrix View */}
<Box sx={{ width: '100%' }}>
<Videos videos={videos} />
</Box>
</Box>
</Box>
);
};

export default Feed;
