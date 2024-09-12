// src/pages/Home.js
import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import ArticleCard from "../components/ArticleCard";
import { fetchNewsAPIArticles } from "../services/newsAPIService";
import { fetchGuardianArticles } from "../services/guardianService";
import { fetchNYTimesArticles } from "../services/nyTimesService";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [filters, setFilters] = useState({
    query: "latest",
    date: "",
    category: "",
    source: "",
  });

  useEffect(() => {
    const fetchArticles = async () => {
      let results = [];
      if (filters.source === "newsapi" || !filters.source) {
        results = results.concat(
          await fetchNewsAPIArticles(
            filters.query,
            filters.date,
            filters.category
          )
        );
      }
      if (filters.source === "guardian" || !filters.source) {
        results = results.concat(
          await fetchGuardianArticles(
            filters.query,
            filters.date,
            filters.category
          )
        );
      }
      if (filters.source === "nytimes" || !filters.source) {
        results = results.concat(
          await fetchNYTimesArticles(
            filters.query,
            filters.date,
            filters.category
          )
        );
      }
      setArticles(results);
    };
    fetchArticles();
  }, [filters]);

  const handleSearch = (searchParams) => {
    setFilters(searchParams);
  };

  return (
    <div className='home'>
      <SearchBar onSearch={handleSearch} />
      <div className='article-list'>
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))
        ) : (
          <p>No articles found</p>
        )}
      </div>
    </div>
  );
};

export default Home;
