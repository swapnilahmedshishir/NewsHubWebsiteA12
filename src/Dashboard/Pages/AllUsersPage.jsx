import React, { useState } from "react";
import useAxiosSequre from "../../Hook/useAxiosSequre";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const AllUsersPage = () => {
  const axiosSequre = useAxiosSequre();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  // Fetch users with pagination
  const {
    data: paginatedData = { users: [], total: 0 },
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users", currentPage, pageSize],
    queryFn: async () => {
      const response = await axiosSequre.get(
        `/api/users?page=${currentPage}&limit=${pageSize}`
      );
      return response.data;
    },
  });

  const { users = [], total = 0 } = paginatedData; // Ensure users and total are always defined
  const totalPages = Math.ceil(total / pageSize);

  // Handle make admin
  const handleMakeAdmin = async (id) => {
    try {
      const response = await axiosSequre.patch(`/api/users/make-admin/${id}`);
      if (response.data.modifiedCount > 0) {
        toast.success("User successfully promoted to admin!");
        refetch();
      } else {
        toast.error("Failed to promote user to admin.");
      }
    } catch (error) {
      // console.error("Error making user admin:", error);
      toast.error("An error occurred while making user admin.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">An error occurred while fetching users.</p>
      ) : (
        <>
          <table className="table-auto w-full bg-white shadow rounded">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">User Photo</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, i) => (
                  <tr key={user._id}>
                    <td className="border px-4 py-2">
                      {(currentPage - 1) * pageSize + i + 1}
                    </td>
                    <td className="border px-2 py-2">
                      <img
                        src={user.photoURL || "/default-avatar.png"}
                        alt="User Profile"
                        className="h-9 w-9 rounded-full border-2 border-gray-300 mx-auto"
                        referrerPolicy="no-referrer"
                      />
                    </td>
                    <td className="border px-4 py-2">{user.displayName}</td>
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2">
                      {user.isAdmin ? (
                        <span className="text-green-600 font-semibold">
                          Admin
                        </span>
                      ) : (
                        <button
                          className="bg-gradient-to-r from-blue-400 to-green-500 text-white px-2 py-1 rounded"
                          onClick={() => handleMakeAdmin(user._id)}
                        >
                          Make Admin
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            <button
              className="bg-gray-200 px-3 py-1 rounded mx-1"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`px-3 py-1 mx-1 rounded ${
                  currentPage === index + 1
                    ? "bg-gradient-to-r from-blue-400 to-green-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="bg-gray-200 px-3 py-1 rounded mx-1"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AllUsersPage;
