import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../Context/ContextProvider";
import useAxiosSequre from "../../Hook/useAxiosSequre";

const ArticleDetailsPage = () => {
  const { id } = useParams();
  const { apiUrl } = useContext(AppContext);
  const axiosSecure = useAxiosSequre();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);

        // Fetch the article details
        const response = await axiosSecure.get(`/api/articles/${id}`);
        setArticle(response.data);
        // Increment the view count after fetching the article
        await incrementViewCount();
      } catch (err) {
        setError("Failed to load article details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const incrementViewCount = async () => {
      try {
        await axiosSecure.patch(`/api/articles/${id}/view`);
      } catch (err) {
        console.error("Error incrementing view count:", err);
      }
    };

    fetchArticle();
  }, [id, axiosSecure]);

  if (loading) {
    return <div className="text-center py-10">Loading article...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Article Details */}
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
          <p className="text-gray-600 mb-2">
            <span className="font-medium">Published By:</span>{" "}
            {article.publisher}
          </p>
          <p className="text-gray-600 mb-2">
            <span className="font-medium">Posted On:</span>{" "}
            {new Date(article.postedDate).toLocaleDateString()}
          </p>
          <p className="text-gray-600 mb-4">
            <span className="font-medium">Tags:</span> {article.tags.join(", ")}
          </p>
          <p className="text-gray-700 mb-6">{article.description}</p>
        </div>

        {/* Author Section */}
        <div className="p-6 border-t bg-gray-50">
          <div className="flex items-center">
            <img
              src={article.authorPhoto}
              alt={article.authorName}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <h3 className="font-semibold text-gray-900">
                {article.authorName}
              </h3>
              <p className="text-sm text-gray-600">{article.authorEmail}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailsPage;
