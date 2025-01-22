import React, { useEffect, useState } from "react";
import useAxiosSequre from "../../Hook/useAxiosSequre";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const AllUsersPage = () => {
  const axiosSequre = useAxiosSequre();
  // use a tarnsktack query then data fetch
  const {
    data: users = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosSequre.get("/api/users");
      return response.data;
    },
  });

  // handle make admin

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
      console.error("Error making user admin:", error);
      toast.error("An error occurred while making user admin.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <table className="table-auto w-full bg-white shadow rounded">
        <thead>
          <tr>
            <th className="px-4 py-2">id</th>
            <th className="px-4 py-2">Use Photo</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{i + 1}</td>
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
                  <span className="text-green-600 font-semibold">Admin</span>
                ) : (
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => handleMakeAdmin(user._id)}
                  >
                    Make Admin
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsersPage;
