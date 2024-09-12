// src/services/guardianService.js
import axios from "axios";

const BASE_URL = "https://content.guardianapis.com/search";

export const fetchGuardianArticles = async (query, date, category) => {
  if (!query) {
    console.error("Query parameter is required.");
    return [];
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: query,
        apiKey: process.env.REACT_APP_GUARDIAN_API_KEY,
        fromDate: date,
        // The Guardian might not support category directly; verify with API docs
        // category: category,
        showFields: "thumbnail,headline,bodyText",
      },
    });

    return response.data.response.results.map((item) => ({
      title: item.webTitle,
      description: item.fields.bodyText,
      url: item.webUrl,
      imageUrl: item.fields.thumbnail,
      publishedAt: item.webPublicationDate,
      source: "The Guardian",
    }));
  } catch (error) {
    console.error("Error fetching Guardian articles:", error);
    return [];
  }
};
