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
        "api-key": process.env.REACT_APP_GUARDIAN_API_KEY,
        "from-date": date || undefined,
        section: category || undefined,
        showFields: "headline,trailText",
        "show-elements": "image",
      },
    });

    return response.data.response.results.map((item) => {      
      const imageElement = item.elements?.find(
        (element) => element.type === "image"
      );
      const imageUrl = imageElement?.assets?.length
        ? imageElement.assets[0].file
        : "";

      return {
        title: item.webTitle,        
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
