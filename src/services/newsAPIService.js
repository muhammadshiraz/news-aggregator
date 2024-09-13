import axios from "axios";

const BASE_URL = "https://newsapi.org/v2/top-headlines";

export const fetchNewsAPIArticles = async (query, date, category) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: query || '',
        category: category || undefined, // Only include category if defined
        apiKey: process.env.REACT_APP_NEWS_API_KEY,
        language: "en",
        from: date || undefined, // Only include 'from' if date is provided
      },
    });

    // Log the API response for debugging purposes
    console.log("NewsAPI Response:", response.data);

    // Check if articles are returned
    if (response.data.status === 'ok' && response.data.articles.length > 0) {
      return response.data.articles.map((item) => ({
        title: item.title,
        description: item.description,
        url: item.url,
        imageUrl: item.urlToImage,
        publishedAt: item.publishedAt,
        source: item.source.name,
      }));
    } else {
      console.warn("No articles found for the provided query, date, or category.");
      return [];
    }
  } catch (error) {
    // Enhanced error handling with additional debugging info
    console.error("Error fetching NewsAPI articles:", error.response ? error.response.data : error.message);
    return [];
  }
};
