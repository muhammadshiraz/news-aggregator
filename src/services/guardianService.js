// src/services/guardianService.js
import axios from "axios";

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
const GUARDIAN_API_URL = "https://content.guardianapis.com/search";

export const fetchGuardianArticles = async (query = "latest", date = "", category = "") => {
  try {
    const response = await axios.get(`${CORS_PROXY}${GUARDIAN_API_URL}`, {
      params: {
        q: query,
        apiKey: process.env.REACT_APP_GUARDIAN_API_KEY,
        fromDate: date,
        showFields: "thumbnail,headline,bodyText",
      },
    });
    return response.data.response.results.map((item) => ({
      title: item.fields.headline,
      description: item.fields.bodyText,
      url: item.webUrl,
      imageUrl: item.fields.thumbnail,
      publishedAt: item.webPublicationDate,
    }));
  } catch (error) {
    console.error("Error fetching Guardian articles:", error);
    return [];
  }
};