import React from "react";
import defaultPlaceholderImage from "../assets/images/default-placeholder-image-url.png";
import "../assets/styles/ArticleCard.css";

const ArticleCard = ({ article }) => {
  return (
    <div className='article-card'>
      <img
        src={article.imageUrl || defaultPlaceholderImage} // Use a default image if no image URL is available
        alt={article.title}
        className='article-image'
      />
      <h3>{article.title}</h3>
      <p>{article.description}</p>
      <a href={article.url} target='_blank' rel='noopener noreferrer'>
        Read More
      </a>
      <p>Source: {article.source}</p>
      <p>Published At: {new Date(article.publishedAt).toLocaleDateString()}</p>
    </div>
  );
};

export default ArticleCard;
