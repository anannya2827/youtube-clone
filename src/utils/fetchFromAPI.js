import axios from 'axios';

// 1. Updated base URL to match your exact endpoint version from the screenshot
export const BASE_URL = 'https://youtube-v311.p.rapidapi.com';

const options = {
  params: { maxResults: '50' },
  headers: {
    // 2. Put your exact key from the image here:
    'X-RapidAPI-Key': '4df9c406famsh932235fc4788ec9p1beca2jsncdde06c6b526', 
    // 3. Put your exact host from the image here:
    'X-RapidAPI-Host': 'youtube-v311.p.rapidapi.com'
  }
};

export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);
  return data;
};