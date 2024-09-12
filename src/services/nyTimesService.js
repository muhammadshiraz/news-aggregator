import axios from "axios";

const BASE_URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

export const fetchNYTimesArticles = async (query, date, category) => {
  if (!query) {
    console.error("Query parameter is required.");
    return [];
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: query,
        apiKey: process.env.REACT_APP_NY_TIMES_API_KEY,
        begin_date: date,
        fq: category ? `news_desk:("${category}")` : "",
      },
    });

    return response.data.response.docs.map((item) => ({
      title: item.headline.main,
      description: item.abstract,
      url: item.web_url,
      imageUrl:
        item.multimedia.length > 0
          ? `https://static01.nyt.com/${item.multimedia[0].url}`
          : "",
      publishedAt: item.pub_date,
      source: "The New York Times",
    }));
  } catch (error) {
    console.error("Error fetching NY Times articles:", error);
    return [];
  }
};
