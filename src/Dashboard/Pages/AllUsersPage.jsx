import React, { useEffect, useState } from "react";
import useAxiosSequre from "../../Hook/useAxiosSequre";
import { useQuery } from "@tanstack/react-query";

const AllUsersPage = () => {
  const axiosSequre = useAxiosSequre();
  // use a tarnsktack query then data fetch
  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosSequre.get("/api/users");
      return response.data;
    },
  });

  console.log(users);

  const handleMakeAdmin = (id) => {
    console.log(`User with ID ${id} is now an admin.`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <table className="table-auto w-full bg-white shadow rounded">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
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
