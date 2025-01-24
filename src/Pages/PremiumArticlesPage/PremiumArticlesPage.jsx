import React from "react";
import { useNavigate } from "react-router-dom";

const PremiumArticlesPage = ({ articles }) => {
  const navigate = useNavigate();

  // Filter premium and approved articles
  const premiumArticles = articles.filter(
    (article) => article.isPremium && article.status === "Approved"
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
        Premium Articles
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {premiumArticles.map((article) => (
          <div
            key={article.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 truncate">
                {article.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Published by:{" "}
                <span className="font-medium">{article.publisher}</span>
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                {article.description}
              </p>
              <button
                onClick={() => navigate(`/articleDetails/${article._id}`)}
                className="w-full bg-gradient-to-r from-[#031741] via-[#03d2fc] to-[#022d33] text-white px-4 py-2 rounded-lg font-bold hover:opacity-90 transition"
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>

      {premiumArticles.length === 0 && (
        <p className="text-center text-gray-600 dark:text-gray-400 mt-8">
          No premium articles available.
        </p>
      )}
    </div>
  );
};

export default PremiumArticlesPage;
