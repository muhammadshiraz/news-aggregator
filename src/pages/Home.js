// src/pages/Home.js
import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import ArticleCard from "../components/ArticleCard";
import { fetchNewsAPIArticles } from "../services/newsAPIService";
import { fetchGuardianArticles } from "../services/guardianService";
import { fetchNYTimesArticles } from "../services/nyTimesService";

const Home = () => {
  const [newsAPIArticles, setNewsAPIArticles] = useState([]);
  const [guardianArticles, setGuardianArticles] = useState([]);
  const [nyTimesArticles, setNYTimesArticles] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const [filters, setFilters] = useState({
    query: "latest",
    date: "",
    category: "",
    source: "",
  });

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        if (filters.source === "newsapi" || !filters.source) {
          const articles = await fetchNewsAPIArticles(
            filters.query,
            filters.date,
            filters.category
          );
          setNewsAPIArticles(articles);
        } else {
          setNewsAPIArticles([]);
        }

        if (filters.source === "guardian" || !filters.source) {
          const articles = await fetchGuardianArticles(
            filters.query,
            filters.date,
            filters.category
          );
          setGuardianArticles(articles);
        } else {
          setGuardianArticles([]);
        }

        if (filters.source === "nytimes" || !filters.source) {
          const articles = await fetchNYTimesArticles(
            filters.query,
            filters.date,
            filters.category
          );
          setNYTimesArticles(articles);
        } else {
          setNYTimesArticles([]);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [filters]);

  const handleSearch = (searchParams) => {
    setFilters(searchParams);
  };

  return (
    <div className="home">
      <SearchBar onSearch={handleSearch} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="article-sections">
          <section>
            <h2>NewsAPI Articles</h2>
            <div className="article-list">
              {newsAPIArticles.length > 0 ? (
                newsAPIArticles.map((article, index) => (
                  <ArticleCard key={index} article={article} />
                ))
              ) : (
                <p>No articles found</p>
              )}
            </div>
          </section>

          <section>
            <h2>The Guardian Articles</h2>
            <div className="article-list">
              {guardianArticles.length > 0 ? (
                guardianArticles.map((article, index) => (
                  <ArticleCard key={index} article={article} />
                ))
              ) : (
                <p>No articles found</p>
              )}
            </div>
          </section>

          <section>
            <h2>The New York Times Articles</h2>
            <div className="article-list">
              {nyTimesArticles.length > 0 ? (
                nyTimesArticles.map((article, index) => (
                  <ArticleCard key={index} article={article} />
                ))
              ) : (
                <p>No articles found</p>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Home;
