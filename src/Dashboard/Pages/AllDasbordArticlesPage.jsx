import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useAxiosSequre from "../../Hook/useAxiosSequre";

const AllDasbordArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const axiosSecure = useAxiosSequre();
  const [declineModal, setDeclineModal] = useState({
    show: false,
    articleId: null,
  });
  const [declineReason, setDeclineReason] = useState("");

  // Fetch articles data
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axiosSecure.get("/api/articles");
        setArticles(response.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
        toast.error("Failed to load articles!");
      }
    };

    fetchArticles();
  }, []);

  console.log(articles);

  // Approve an article
  const handleApprove = async (id) => {
    try {
      await axios.patch(`/api/articles/${id}/approve`);
      setArticles(
        articles.map((article) =>
          article.id === id ? { ...article, status: "Approved" } : article
        )
      );
      toast.success("Article approved successfully!");
    } catch (error) {
      console.error("Error approving article:", error);
      toast.error("Failed to approve the article!");
    }
  };

  // Decline an article
  const handleDecline = async () => {
    try {
      await axios.patch(`/api/articles/${declineModal.articleId}/decline`, {
        reason: declineReason,
      });
      setArticles(
        articles.map((article) =>
          article.id === declineModal.articleId
            ? { ...article, status: "Declined", declineReason }
            : article
        )
      );
      setDeclineModal({ show: false, articleId: null });
      setDeclineReason("");
      toast.success("Article declined successfully!");
    } catch (error) {
      console.error("Error declining article:", error);
      toast.error("Failed to decline the article!");
    }
  };

  // Delete an article
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/articles/${id}`);
      setArticles(articles.filter((article) => article.id !== id));
      toast.success("Article deleted successfully!");
    } catch (error) {
      console.error("Error deleting article:", error);
      toast.error("Failed to delete the article!");
    }
  };

  // Make an article premium
  const handleMakePremium = async (id) => {
    try {
      await axios.patch(`/api/articles/${id}/make-premium`);
      setArticles(
        articles.map((article) =>
          article.id === id ? { ...article, isPremium: true } : article
        )
      );
      toast.success("Article is now premium!");
    } catch (error) {
      console.error("Error making article premium:", error);
      toast.error("Failed to make the article premium!");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">All Articles</h1>
      <table className="table-auto w-full bg-white shadow rounded">
        <thead>
          <tr>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Author</th>
            <th className="px-4 py-2">Posted Date</th>
            <th className="px-4 py-2">Publisher</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id}>
              <td className="border px-4 py-2">{article.title}</td>
              <td className="border px-4 py-2 flex items-center space-x-2">
                <img
                  src={article.authorPhoto}
                  alt={article.authorName}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p>{article.authorName}</p>
                  <p className="text-sm text-gray-500">{article.authorEmail}</p>
                </div>
              </td>
              <td className="border px-4 py-2">{article.postedDate}</td>
              <td className="border px-4 py-2">{article.publisher}</td>
              <td className="border px-4 py-2">{article.status}</td>
              <td className="border px-4 py-2 space-y-2">
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded"
                  onClick={() => handleApprove(article.id)}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() =>
                    setDeclineModal({ show: true, articleId: article.id })
                  }
                >
                  Decline
                </button>
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => handleMakePremium(article.id)}
                >
                  Make Premium
                </button>
                <button
                  className="bg-gray-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(article.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Decline Modal */}
      {declineModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-bold mb-4">Reason for Declining</h2>
            <textarea
              className="w-full p-2 border rounded"
              rows="4"
              placeholder="Write your reason here..."
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
            ></textarea>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleDecline}
              >
                Submit
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() =>
                  setDeclineModal({ show: false, articleId: null })
                }
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllDasbordArticlesPage;
