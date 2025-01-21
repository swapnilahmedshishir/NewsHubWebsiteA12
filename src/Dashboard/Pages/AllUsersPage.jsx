import React from "react";

const AllUsersPage = () => {
  // Dummy data for demonstration
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", isAdmin: true },
    { id: 2, name: "Jane Smith", email: "jane@example.com", isAdmin: false },
  ];

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
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">
                {user.isAdmin ? (
                  <span className="text-green-600 font-semibold">Admin</span>
                ) : (
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => handleMakeAdmin(user.id)}
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
