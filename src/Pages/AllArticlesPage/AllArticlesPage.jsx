import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/ContextProvider";

const AllArticlesPage = () => {
  const { apiUrl } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPublisher, setSelectedPublisher] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const navigate = useNavigate();

  // Fetch articles using TanStack Query
  const {
    data: articles = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["articles", { searchTerm, selectedPublisher, selectedTags }],
    queryFn: async () => {
      const response = await axios.get(`${apiUrl}/api/articles`, {
        params: {
          search: searchTerm,
          publisher: selectedPublisher,
          tags: selectedTags.join(","),
        },
      });
      return response.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading articles: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">All Articles</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 p-2 border border-gray-300 rounded"
        />

        <select
          value={selectedPublisher}
          onChange={(e) => setSelectedPublisher(e.target.value)}
          className="w-full md:w-1/4 p-2 border border-gray-300 rounded"
        >
          <option value="">All Publishers</option>
          {/* Replace with dynamic publishers */}
          <option value="Publisher 1">Publisher 1</option>
          <option value="Publisher 2">Publisher 2</option>
        </select>

        <select
          multiple
          value={selectedTags}
          onChange={(e) =>
            setSelectedTags(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
          className="w-full md:w-1/3 p-2 border border-gray-300 rounded"
        >
          {/* Replace with dynamic tags */}
          <option value="Tech">Tech</option>
          <option value="Health">Health</option>
          <option value="Business">Business</option>
        </select>
      </div>

      {/* Articles List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div
            key={article.id}
            className={`p-4 border rounded shadow-sm ${
              article.isPremium ? "bg-yellow-100" : "bg-white"
            }`}
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
            <p className="text-gray-700 mb-2">{article.description}</p>
            <p className="text-sm text-gray-500 mb-4">
              Publisher: {article.publisher}
            </p>

            <button
              onClick={() => navigate(`/articles/${article.id}`)}
              disabled={article.isPremium && !article.hasSubscription}
              className={`w-full py-2 px-4 rounded text-white font-semibold ${
                article.isPremium && !article.hasSubscription
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {article.isPremium && !article.hasSubscription
                ? "Subscribe to View"
                : "View Details"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllArticlesPage;
