import axios from 'axios';

export const BASE_URL = 'https://youtube-v31.p.rapidapi.com';

const options = {
  params: {
    maxResults: '50', // Forces the API to pull the maximum layout capacity per request
    regionCode: 'IN'  
  },
  headers: {
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
    
    if (url.includes('search?')) {
      return {
        items: [
          {
            id: { videoId: 'dQw4w9WgXcQ' },
            snippet: {
              title: "Tomorrowland - Official Live Stream Mix",
              channelTitle: "Tomorrowland Festival",
              channelId: "UCnd5as_rcR7cxA942pIFa1g",
              thumbnails: { high: { url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800" } }
            }
          }
        ]
      };
    }
    return { items: [] };
  }
};
