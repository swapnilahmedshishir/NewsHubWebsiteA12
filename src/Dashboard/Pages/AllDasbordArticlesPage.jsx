import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { IoIosCloudDone } from "react-icons/io";
import { TbCancel, TbPremiumRights } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import useFetchArticles from "../../Hook/useFetchArticles";
import useAxiosSequre from "../../Hook/useAxiosSequre";
import Swal from "sweetalert2";

const AllDashboardArticlesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [articles, total, isLoading, refetch, isError] = useFetchArticles(
    currentPage,
    pageSize
  );
  const axiosSecure = useAxiosSequre();
  const [declineModal, setDeclineModal] = useState({
    show: false,
    articleId: null,
  });
  const [declineReason, setDeclineReason] = useState("");
  const totalPages = Math.ceil(total / pageSize);
  // Pagination controls
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Approve an article
  const handleApprove = async (id) => {
    try {
      const response = await axiosSecure.patch(`/api/articles/${id}/approve`);
      if (response.status === 200) {
        toast.success("Article approved successfully!");
        refetch();
      }
    } catch (error) {
      console.error("Error approving article:", error);
      toast.error("Failed to approve the article!");
    }
  };

  // Decline an article
  const handleDecline = async () => {
    try {
      const response = await axiosSecure.patch(
        `/api/articles/${declineModal.articleId}/decline`,
        {
          reason: declineReason,
        }
      );
      if (response.status === 200) {
        toast.success("Article declined successfully!");
        refetch();
      }
      setDeclineModal({ show: false, articleId: null });
      setDeclineReason("");
    } catch (error) {
      console.error("Error declining article:", error);
      toast.error("Failed to decline the article!");
    }
  };

  // Delete an article
  const handleDelete = async (id) => {
    console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.delete(`/api/articles/${id}`);
          if (response.status) {
            toast.success("Article deleted successfully!");
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        } catch (error) {
          console.error("Error deleting article:", error);
          toast.error("Failed to delete the article!");
        }
      }
    });
  };

  // Make an article premium
  const handleMakePremium = async (id) => {
    try {
      const response = await axiosSecure.patch(
        `/api/articles/${id}/make-premium`
      );
      if (response.status) {
        toast.success("Article is now premium!");
        refetch();
      }
    } catch (error) {
      toast.error("Failed to make the article premium!");
    }
  };

  if (isLoading) {
    return <p>Loading articles...</p>;
  }

  if (isError) {
    return <p>Error loading articles. Please try again later.</p>;
  }

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
          {articles?.map((article) => (
            <tr key={article._id}>
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
              {/* <td className="border px-4 py-2">{article.status}</td> */}
              <td
                className={`border px-4 py-2 ${
                  article.status === "Approved"
                    ? "text-green-500"
                    : article.status === "Declined"
                    ? "text-red-500"
                    : ""
                }`}
              >
                {article.status}
              </td>

              <td className="border px-4 py-2 space-y-2">
                <button
                  className="bg-green-500 text-white px-4 py-1 rounded mr-2"
                  onClick={() => handleApprove(article._id)}
                  title="Approve Article"
                >
                  <IoIosCloudDone />
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-1 rounded mr-2"
                  onClick={() =>
                    setDeclineModal({ show: true, articleId: article._id })
                  }
                  title="Decline Article"
                >
                  <TbCancel />
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-1 rounded mr-2"
                  onClick={() => handleDelete(article._id)}
                  title="Delete Article"
                >
                  <MdDelete />
                </button>
                <button
                  className="bg-gradient-to-r from-blue-400 to-green-500 text-white px-4 py-1 rounded"
                  onClick={() => handleMakePremium(article._id)}
                  title="Make Article Premium"
                >
                  <TbPremiumRights />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
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

export default AllDashboardArticlesPage;
