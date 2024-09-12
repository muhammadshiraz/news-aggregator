// src/services/newsAPIService.js
import axios from "axios";

const BASE_URL = "https://newsapi.org/v2/everything";

export const fetchNewsAPIArticles = async (query, date, category) => {
  if (!query) {
    console.error("Query parameter is required.");
    return [];
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: query,
        apiKey: process.env.REACT_APP_NEWS_API_KEY,
        language: "en",
        sortBy: "publishedAt",
        from: date,
        // Note: NewsAPI might not support category directly; check API docs.
        // Use a valid category parameter if supported or remove it.
        // category: category.toLowerCase(),
      },
    });

    return response.data.articles.map((item) => ({
      title: item.title,
      description: item.description,
      url: item.url,
      imageUrl: item.urlToImage,
      publishedAt: item.publishedAt,
      source: item.source.name,
    }));
  } catch (error) {
    console.error("Error fetching NewsAPI articles:", error);
    return [];
  }
};
