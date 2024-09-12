import React from "react";

const NewsArticle = ({ article }) => {
  return (
    <div className="news-article">
      <img src={article.imageUrl} alt={article.title} />
      <h3>{article.title}</h3>
      <p>{article.description}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        Read more
      </a>
      <p>{new Date(article.publishedAt).toLocaleDateString()}</p>
    </div>
  );
};

export default NewsArticle;
