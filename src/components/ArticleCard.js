import React from "react";

const ArticleCard = ({ article }) => (
  <div className='article-card'>
    <h2>{article.title}</h2>
    {article.imageUrl && <img src={article.imageUrl} alt={article.title} />}
    <p>{article.description}</p>
    <a href={article.url} target='_blank' rel='noopener noreferrer'>
      Read more
    </a>
    <p>Source: {article.source}</p>
    <p>Published at: {new Date(article.publishedAt).toLocaleDateString()}</p>
  </div>
);

export default ArticleCard;
