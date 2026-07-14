import axios from 'axios';

export const BASE_URL = 'https://youtube-v31.p.rapidapi.com';

const options = {
  params: {
    maxResults: '50'
  },
  headers: {
    // Your active verified YouTube v3 data mapping key
    'X-RapidAPI-Key': '4df9c406famsh932235fc4788ec9p1beca2jsncdde06c6b526',
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
  },
};

export const fetchFromAPI = async (url) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);
    return data;
  } catch (error) {
    console.error("API Fetch Engine Error: ", error.response?.data || error.message);
    
    // Fallback Mock Engine: Prevents layout breaking if the live key runs out of daily query credits
    if (url.includes('search?')) {
      return {
        items: [
          {
            id: { videoId: 'dQw4w9WgXcQ' },
            snippet: {
              title: "Tomorrowland 2026 - Official Mainstage Live Stream Mix",
              channelTitle: "Tomorrowland Festival",
              channelId: "UCnd5as_rcR7cxA942pIFa1g",
              thumbnails: { high: { url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800" } }
            }
          },
          {
            id: { videoId: '9bZkp7q19f0' },
            snippet: {
              title: "PSY - GANGNAM STYLE (강남스타일) M/V HD",
              channelTitle: "officialpsy",
              channelId: "UC77i21Q2T4x6QGzXwA5n8aA",
              thumbnails: { high: { url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800" } }
            }
          }
        ]
      };
    }

    if (url.includes('videos?')) {
      const extractedId = url.split('id=')[1]?.split('&')[0] || 'dQw4w9WgXcQ';
      return {
        items: [{
          id: extractedId,
          snippet: {
            title: "Dynamic High-Definition Video Stream",
            channelTitle: "Media Premium Stream Hub",
            description: "Welcome to your high-performance custom video player interface."
          },
          statistics: { viewCount: "8472900", likeCount: "638200" }
        }]
      };
    }

    return { items: [] };
  }
};
