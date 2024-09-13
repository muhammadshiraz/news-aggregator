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
        "api-key": process.env.REACT_APP_GUARDIAN_API_KEY, // Correct API key parameter
        "from-date": date || undefined, // Apply date filter if provided
        section: category || undefined, // Apply section/category filter if provided
        showFields: "headline,trailText", // Use trailText instead of bodyText to avoid [Removed] issues
        "show-elements": "image", // Include media elements for images
      },
    });

    return response.data.response.results.map((item) => {
      // Extract the image URL from media elements if available
      const imageElement = item.elements?.find(
        (element) => element.type === "image"
      );
      const imageUrl = imageElement?.assets?.length
        ? imageElement.assets[0].file
        : "";

      return {
        title: item.webTitle,
        // Use trailText or fallback to a default message if content is restricted
        description: item.fields?.trailText || "Content unavailable.",
        url: item.webUrl,
        imageUrl: imageUrl,
        publishedAt: item.webPublicationDate,
        source: "The Guardian",
      };
    });
  } catch (error) {
    console.error("Error fetching Guardian articles:", error);
    return [];
  }
};
