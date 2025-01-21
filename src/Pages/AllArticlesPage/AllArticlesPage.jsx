import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/ContextProvider";
import useArtical from "../../Hook/useArtical";
import axios from "axios";

const AllArticlesPage = () => {
  const { apiUrl } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPublisher, setSelectedPublisher] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  // Fetch publishers and tags dynamically
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [publisherResponse, tagResponse] = await Promise.all([
          axios.get(`${apiUrl}/api/publishers`),
          axios.get(`${apiUrl}/api/tags`),
        ]);
        setPublishers(publisherResponse.data);
        setTags(tagResponse.data);
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };
    fetchFilters();
  }, [apiUrl]);

  // Fetch articles with the custom hook
  const [filteredArticles, isLoading, error] = useArtical({
    searchTerm,
    selectedPublisher,
    selectedTags,
  });
  console.log(filteredArticles);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading articles: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">All Articles</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-10 md:w-1/3 p-2 border border-gray-300 rounded"
        />

        {/* Publisher Dropdown */}
        <select
          value={selectedPublisher}
          onChange={(e) => setSelectedPublisher(e.target.value)}
          className="w-full md:w-1/4 h-10 p-2 border border-gray-300 rounded"
        >
          <option value="">All Publishers</option>
          {publishers.map((publisher) => (
            <option key={publisher.id} value={publisher.name}>
              {publisher.name}
            </option>
          ))}
        </select>

        {/* Tags Dropdown */}
        <select
          multiple
          value={selectedTags}
          onChange={(e) =>
            setSelectedTags(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
          className="w-full md:w-1/3 h-10 p-2 border border-gray-300 rounded"
        >
          {tags.map((tag) => (
            <option key={tag.id} value={tag.name}>
              {tag.name}
            </option>
          ))}
        </select>
      </div>

      {/* Articles List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <div
            key={article._id}
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
