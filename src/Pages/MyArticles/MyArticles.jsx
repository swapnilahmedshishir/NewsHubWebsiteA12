import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { AppContext } from "../../Context/ContextProvider";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const MySwal = withReactContent(Swal);

const MyArticles = () => {
  const { apiUrl, user } = useContext(AppContext);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch campaigns added by the logged-in user
  useEffect(() => {
    if (user) {
      axios
        .get(`${apiUrl}/api/myCampaigns`, { params: { email: user.email } })
        .then((response) => {
          setCampaigns(response.data);
          setLoading(false);
        })
        .catch((error) => {
          //console.error("Error fetching campaigns:", error);
          setLoading(false);
          toast.error("Could not fetch your campaigns.");
        });
    }
  }, [apiUrl, user]);

  const handleDelete = (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${apiUrl}/api/campaigns/${id}`)
          .then(() => {
            setCampaigns(campaigns.filter((campaign) => campaign._id !== id));
            MySwal.fire({
              icon: "success",
              title: "Deleted!",
              text: "The campaign has been deleted.",
              confirmButtonColor: "#3085d6",
            });
          })
          .catch((error) => {
            //console.error("Error deleting campaign:", error);
            toast.error("Failed to delete the campaign.");
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen dark:text-gray-200">
        Loading...
      </div>
    );
  }

  if (campaigns.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500 dark:text-gray-400">
        You have not added any campaigns.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 dark:bg-gray-800 dark:text-gray-200 bg-white text-gray-900">
      <h1 className="text-3xl font-bold text-center mb-6">My Campaigns</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-700 shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="py-3 px-4 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-200 text-left text-sm font-semibold uppercase">
                Title
              </th>
              <th className="py-3 px-4 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-200 text-left text-sm font-semibold uppercase">
                Type
              </th>
              <th className="py-3 px-4 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-200 text-left text-sm font-semibold uppercase">
                Min Donation
              </th>
              <th className="py-3 px-4 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-200 text-left text-sm font-semibold uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr
                key={campaign._id}
                className="border-b hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                  {campaign.title}
                </td>
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                  {campaign.type}
                </td>
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                  ${campaign.minDonation}
                </td>
                <td className="py-3 px-4 flex gap-4">
                  <Link to={`/updateCampaign/${campaign._id}`}>
                    <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded">
                      <FaEdit />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(campaign._id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
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
