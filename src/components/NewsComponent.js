// src/components/NewsComponent.js
import React, { useEffect, useState } from "react";
import { fetchNewsAPIArticles, fetchGuardianArticles, fetchNYTimesArticles } from "../services/newsService";

const NewsComponent = () => {
  const [news, setNews] = useState([]);
  const [guardianNews, setGuardianNews] = useState([]);
  const [nytimesNews, setNYTimesNews] = useState([]);

  const [query, setQuery] = useState("latest"); // Default search term
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  // Fetch articles when query, date, or category changes
  useEffect(() => {
    const fetchNews = async () => {
      const newsData = await fetchNewsAPIArticles(query, date, category);
      const guardianData = await fetchGuardianArticles(query, date);
      const nyTimesData = await fetchNYTimesArticles(query, date);
      
      setNews(newsData);
      setGuardianNews(guardianData);
      setNYTimesNews(nyTimesData);
    };

    fetchNews();
  }, [query, date, category]);

  // Handle search input
  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  // Handle date selection
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  // Handle category selection
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div>
      {/* Search and Filters */}
      <div>
        <input 
          type="text" 
          placeholder="Search for news..." 
          value={query} 
          onChange={handleSearch} 
          style={{ marginRight: "10px" }}
        />

        <input 
          type="date" 
          value={date} 
          onChange={handleDateChange} 
          style={{ marginRight: "10px" }}
        />

        <select value={category} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          <option value="business">Business</option>
          <option value="technology">Technology</option>
          <option value="sports">Sports</option>
          <option value="health">Health</option>
          <option value="politics">Politics</option>
        </select>
      </div>

      {/* Display NewsAPI Articles */}
      <h2>NewsAPI Articles</h2>
      {news.map((article) => (
        <div key={article.url}>
          <h3>{article.title}</h3>
          {article.imageUrl && <img src={article.imageUrl} alt={article.title} style={{ width: "100px" }} />}
          <p>{article.description}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
        </div>
      ))}

      {/* Display Guardian Articles */}
      <h2>Guardian Articles</h2>
      {guardianNews.map((article) => (
        <div key={article.url}>
          <h3>{article.title}</h3>
          {article.imageUrl && <img src={article.imageUrl} alt={article.title} style={{ width: "100px" }} />}
          <p>{article.description}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
        </div>
      ))}

      {/* Display NYTimes Articles */}
      <h2>NY Times Articles</h2>
      {nytimesNews.map((article) => (
        <div key={article.url}>
          <h3>{article.title}</h3>
          {article.imageUrl && <img src={article.imageUrl} alt={article.title} style={{ width: "100px" }} />}
          <p>{article.description}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
        </div>
      ))}
    </div>
  );
};

export default NewsComponent;
