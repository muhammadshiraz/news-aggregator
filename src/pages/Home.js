import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import ArticleCard from "../components/ArticleCard";
import { fetchNewsAPIArticles } from "../services/newsAPIService";
import { fetchGuardianArticles } from "../services/guardianService";
import { fetchNYTimesArticles } from "../services/nyTimesService";
import "../assets/styles/Home.css";

const Home = () => {  
  const [newsAPIArticles, setNewsAPIArticles] = useState([]);
  const [guardianArticles, setGuardianArticles] = useState([]);
  const [nyTimesArticles, setNYTimesArticles] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const [filters, setFilters] = useState({
    query: "",
    date: "",
    category: "",
    source: "",
  });

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        if (filters.source === "newsapi") {
          // Fetch only NewsAPI Articles
          const newsArticles = await fetchNewsAPIArticles(
            filters.query,
            filters.date,
            filters.category
          );
          setNewsAPIArticles(newsArticles);
          setGuardianArticles([]); // Clear other sources
          setNYTimesArticles([]);
        } else if (filters.source === "guardian") {
          // Fetch only Guardian Articles
          const guardianArticles = await fetchGuardianArticles(
            filters.query,
            filters.date,
            filters.category
          );
          setGuardianArticles(guardianArticles);
          setNewsAPIArticles([]); // Clear other sources
          setNYTimesArticles([]);
        } else if (filters.source === "nytimes") {
          // Fetch only NY Times Articles
          const nyTimesArticles = await fetchNYTimesArticles(
            filters.query,
            filters.date,
            filters.category
          );
          setNYTimesArticles(nyTimesArticles);
          setNewsAPIArticles([]); // Clear other sources
          setGuardianArticles([]);
        } else {
          // Fetch articles from all sources for the initial load
          const newsArticles = await fetchNewsAPIArticles(filters.query, filters.date, filters.category);
          const guardianArticles = await fetchGuardianArticles(filters.query, filters.date, filters.category);
          const nyTimesArticles = await fetchNYTimesArticles(filters.query, filters.date, filters.category);

          setNewsAPIArticles(newsArticles);
          setGuardianArticles(guardianArticles);
          setNYTimesArticles(nyTimesArticles);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles(); // Fetch articles on component mount and whenever filters change
  }, [filters]);
  

  const handleSearch = (searchParams) => {
    setFilters(searchParams);
  };

  return (
    <div className="home">
      <SearchBar onSearch={handleSearch} />
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
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
