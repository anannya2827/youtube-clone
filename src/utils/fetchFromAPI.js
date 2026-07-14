import axios from 'axios';

export const BASE_URL = 'https://youtube-v31.p.rapidapi.com';

const options = {
  headers: {
    'X-RapidAPI-Key': '4df9c406famsh932235fc4788ec9p1beca2jsncdde06c6b526',
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
  },
};

export const fetchFromAPI = async (url) => {
  try {
    // Standardize query concatenation so parameters never overwrite or clash
    const separator = url.includes('?') ? '&' : '?';
    let fullUrl = `${BASE_URL}/${url}`;
    
    if (!url.includes('maxResults=')) {
      fullUrl += `${separator}maxResults=50`;
    }

    const { data } = await axios.get(fullUrl, options);
    return data;
  } catch (error) {
    console.error("Live API Network Error: ", error.response?.data || error.message);
    // Return empty array state on failure so it doesn't break rendering streams
    return { items: [] };
  }
};
