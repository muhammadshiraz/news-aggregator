import React from "react";
import NewsArticle from "./NewsArticle";

const NewsList = ({ articles }) => {
  return (
    <div className="news-list">
      {articles.map((article, index) => (
        <NewsArticle key={index} article={article} />
      ))}
    </div>
  );
};

export default NewsList;
