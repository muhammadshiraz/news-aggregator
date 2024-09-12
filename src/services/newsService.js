// src/services/newsService.js
import axios from "axios";

const NEWS_API_URL = "https://newsapi.org/v2/everything";
const GUARDIAN_API_URL = "https://content.guardianapis.com/search";
const NYTIMES_API_URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

// Helper function to format query parameters
const formatQueryParams = (query, date, category) => {
  return {
    q: query || "latest", // Default to "latest" if no query is provided
    fromDate: date || undefined, // Send the date only if provided
    category: category || undefined, // Send the category only if provided
  };
};

// Fetch NewsAPI articles
export const fetchNewsAPIArticles = async (query = "latest", date = "", category = "") => {
  try {
    const formattedParams = formatQueryParams(query, date, category);
    const response = await axios.get(NEWS_API_URL, {
      params: {
        ...formattedParams,
        apiKey: process.env.REACT_APP_NEWS_API_KEY,
      },
    });

    return response.data.articles.map((article) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      imageUrl: article.urlToImage,
      publishedAt: article.publishedAt,
    }));
  } catch (error) {
    console.error("NewsAPI Error:", error.message);
    return [];
  }
};

// Fetch Guardian API articles
export const fetchGuardianArticles = async (query = "latest", date = "") => {
  try {
    const response = await axios.get(GUARDIAN_API_URL, {
      params: {
        q: query,
        fromDate: date || undefined,
        showFields: "thumbnail,headline,bodyText",
        apiKey: process.env.REACT_APP_GUARDIAN_API_KEY,
      },
    });

    return response.data.response.results.map((item) => ({
      title: item.webTitle,
      description: item.fields.bodyText,
      url: item.webUrl,
      imageUrl: item.fields.thumbnail,
      publishedAt: item.webPublicationDate,
    }));
  } catch (error) {
    console.error("Guardian API Error:", error.message);
    return [];
  }
};

// Fetch NY Times API articles
export const fetchNYTimesArticles = async (query = "latest", date = "") => {
  try {
    const formattedParams = formatQueryParams(query, date);
    const response = await axios.get(NYTIMES_API_URL, {
      params: {
        ...formattedParams,
        "api-key": process.env.REACT_APP_NYTIMES_API_KEY,
      },
    });

    return response.data.response.docs.map((item) => ({
      title: item.headline.main,
      description: item.abstract,
      url: item.web_url,
      imageUrl: item.multimedia.length ? `https://www.nytimes.com/${item.multimedia[0].url}` : null,
      publishedAt: item.pub_date,
    }));
  } catch (error) {
    console.error("NY Times API Error:", error.message);
    return [];
  }
};
