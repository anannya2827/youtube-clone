import axios from 'axios';

// Bypasses the exhausted keys by utilizing an un-throttled public proxy query engine
export const BASE_URL = 'https://youtube-v3-alternative.p.rapidapi.com';

export const fetchFromAPI = async (url) => {
  // Pull parameters cleanly out of the address path
  const urlParams = new URLSearchParams(url.split('?')[1]);
  const searchQuery = urlParams.get('q') || 'Trending';
  const targetId = urlParams.get('id') || urlParams.get('relatedToVideoId');

  const options = {
    headers: {
      // Your active credential key string
      'X-RapidAPI-Key': '4df9c406famsh932235fc4788ec9p1beca2jsncdde06c6b526',
      'X-RapidAPI-Host': 'youtube-v3-alternative.p.rapidapi.com',
    },
  };

  try {
    let finalUrl = `${BASE_URL}/trending?geo=IN`;

    if (url.includes('search?')) {
      finalUrl = `${BASE_URL}/search?query=${encodeURIComponent(searchQuery)}`;
    } else if (url.includes('videos?') && targetId) {
      finalUrl = `${BASE_URL}/video?id=${targetId}`;
    }

    const { data } = await axios.get(finalUrl, options);

    // Maps original titles, authentic YouTube thumbnails, and live descriptions perfectly
    if (data?.data) {
      const liveItems = data.data.map((item) => ({
        id: { videoId: item.videoId || item.id },
        snippet: {
          title: item.title, // Authentic original title
          description: item.description || 'No description provided by creator.', // Real video description
          channelTitle: item.channelTitle || 'Verified Channel',
          channelId: item.channelId,
          thumbnails: {
            high: { url: item.thumbnail?.[0]?.url || item.thumbnailUrl || `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg` },
            medium: { url: item.thumbnail?.[1]?.url || item.thumbnailUrl },
            default: { url: item.thumbnail?.[2]?.url || item.thumbnailUrl }
          }
        }
      }));

      return { items: liveItems };
    }

    // Individual video item detail page parser mapping handler
    if (data?.title) {
      return {
        items: [{
          id: data.videoId || targetId,
          snippet: {
            title: data.title,
            description: data.description, // Pulls real live video description text strings
            channelTitle: data.channelTitle,
            channelId: data.channelId,
            thumbnails: { high: { url: data.thumbnail?.[0]?.url } }
          },
          statistics: {
            viewCount: data.viewCount || '0',
            likeCount: data.likeCount || '0'
          }
        }]
      };
    }
    
    throw new Error("Live data structure mismatch encountered.");
  } catch (error) {
    console.error("Live fetch blocked: ", error.message);
    return { items: [] };
  }
};
