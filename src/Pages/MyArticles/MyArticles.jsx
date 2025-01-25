import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AppContext } from "../../Context/ContextProvider";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import useAxiosSequre from "../../Hook/useAxiosSequre";

const MySwal = withReactContent(Swal);

const MyArticles = () => {
  const { apiUrl, user } = useContext(AppContext);
  const axiosSequre = useAxiosSequre();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [declineReason, setDeclineReason] = useState("");

  // Fetch the current user's articles
  useEffect(() => {
    if (user) {
      axiosSequre
        .get(`/api/myArticles`, { params: { email: user?.email } })
        .then((response) => {
          setArticles(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching articles:", error);
          toast.error("Could not fetch your articles.");
          setLoading(false);
        });
    }
  }, [user, axiosSequre]);

  // Delete an article
  const handleDelete = (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSequre
          .delete(`/api/myarticles/${id}`)
          .then(() => {
            setArticles(articles.filter((article) => article._id !== id));
            MySwal.fire({
              icon: "success",
              title: "Deleted!",
              text: "Your article has been deleted.",
            });
          })
          .catch((error) => {
            console.error("Error deleting article:", error);
            toast.error("Failed to delete the article.");
          });
      }
    });
  };

  // Show decline reason modal
  const showDeclineReason = (reason) => {
    setDeclineReason(reason);
    MySwal.fire({
      title: "Decline Reason",
      text: reason,
      icon: "info",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">
        You have not added any articles.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">My Articles</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="py-3 px-4 bg-gray-200 text-left text-sm font-semibold uppercase">
                Serial No
              </th>
              <th className="py-3 px-4 bg-gray-200 text-left text-sm font-semibold uppercase">
                Title
              </th>
              <th className="py-3 px-4 bg-gray-200 text-left text-sm font-semibold uppercase">
                View
              </th>
              <th className="py-3 px-4 bg-gray-200 text-left text-sm font-semibold uppercase">
                Status
              </th>
              <th className="py-3 px-4 bg-gray-200 text-left text-sm font-semibold uppercase">
                Is Premium
              </th>
              <th className="py-3 px-4 bg-gray-200 text-left text-sm font-semibold uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, index) => (
              <tr
                key={article._id}
                className="border-b hover:bg-gray-100 transition"
              >
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{article?.title}</td>
                <td className="py-3 px-4">{article?.views}</td>
                <td className="py-3 px-4">
                  {article?.status === "Declined" ? (
                    <>
                      <span className="text-red-500">{article?.status}</span>
                      <button
                        onClick={() => showDeclineReason(article.declineReason)}
                        className="ml-2 text-blue-500 underline"
                      >
                        View Reason
                      </button>
                    </>
                  ) : (
                    <span
                      className={`${
                        article.status === "Approved"
                          ? "text-green-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {article.status}
                    </span>
                  )}
                </td>
                <td className="py-3 px-4">
                  {article.isPremium ? "Yes" : "No"}
                </td>
                <td className="py-3 px-4 flex gap-2">
                  <Link to={`/articleDetails/${article._id}`}>
                    <button className="bg-gradient-to-r from-blue-400 to-green-500 text-white px-4 py-1 rounded">
                      Details
                    </button>
                  </Link>
                  <Link to={`/updateArticle/${article._id}`}>
                    <button className="bg-green-500 text-white px-4 py-1 rounded">
                      <FaEdit />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(article._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyArticles;
