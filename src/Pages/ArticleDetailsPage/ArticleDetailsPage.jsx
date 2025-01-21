import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ArticleDetailsPage = () => {
  const { id } = useParams(); // Get the article ID from the route
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // Fetch article details
        const response = await axios.get(`/api/articles/${id}`);
        setArticle(response.data);

        // Update view count
        await axios.put(`/api/articles/${id}/view`);
      } catch (err) {
        setError("Failed to load article.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-200 text-gray-700 px-4 py-2 rounded mb-4"
      >
        Back
      </button>
      <div className="bg-white p-6 rounded shadow-md">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-64 object-cover rounded mb-4"
        />
        <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
        <p className="text-gray-600 mb-4">Publisher: {article.publisher}</p>
        <p className="text-gray-800">{article.longDescription}</p>
        <div className="mt-6 text-sm text-gray-500">
          <span>Views: {article.views}</span>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailsPage;
