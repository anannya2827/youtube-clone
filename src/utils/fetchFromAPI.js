import axios from 'axios';

export const BASE_URL = 'https://youtube-v31.p.rapidapi.com';

export const fetchFromAPI = async (url) => {
  const options = {
    params: {
      maxResults: '50', // Pulls maximum layout capacity dynamically per request
      regionCode: 'IN'  
    },
    headers: {
      'X-RapidAPI-Key': '4df9c406famsh932235fc4788ec9p1beca2jsncdde06c6b526',
      'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
    },
  };

  try {
    // Ensures clean endpoint connection without breaking search layout shapes
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);
    
    // Dynamically returns the live production data arrays directly
    return data;
  } catch (error) {
    console.error("API Fetch Error: ", error.response?.data || error.message);
    
    // Instead of dropping onto hardcoded objects, we throw an empty structure 
    // to allow React components to handle updating states gracefully.
    return { items: [] };
  }
};
