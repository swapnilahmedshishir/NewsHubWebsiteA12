import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import CountUp from "react-countup";
import { useAxiospublic } from "../../Hook/useAxiospublic";
import { AppContext } from "../../Context/ContextProvider";

const Statistics = () => {
  const axiosPublic = useAxiospublic();
  const { isLoading } = useContext(AppContext);

  // Fetch all users data
  const {
    data: userResponse = { users: [], total: 0 },
    isLoading: userLoadding,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    enabled: !isLoading,
    queryFn: async () => {
      const response = await axiosPublic.get(`/api/users`);
      return response.data;
    },
  });

  const users = userResponse.users || [];

  // Function to check if a user is premium
  const isPremiumUser = (user) => {
    return user.premiumTaken && new Date(user.premiumTaken) > new Date();
  };

  // Separate premium and normal users
  const premiumUsers = users.filter(isPremiumUser);
  const normalUsers = users.filter((user) => !isPremiumUser(user));

  if (userLoadding) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {/* Statistics Section */}
      <section className="py-10 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Statistics
        </h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 mx-auto max-w-5xl">
          {/* Total Users */}
          <div className="bg-gray-100 shadow-md p-6 rounded-lg text-center">
            <p className="text-4xl font-bold text-blue-600">
              <CountUp end={users.length} duration={2} />
            </p>
            <p className="text-gray-500">Total Users</p>
          </div>
          {/* Normal Users */}
          <div className="bg-gray-100 shadow-md p-6 rounded-lg text-center">
            <p className="text-4xl font-bold text-green-600">
              <CountUp end={normalUsers.length} duration={2} />
            </p>
            <p className="text-gray-500">Normal Users</p>
          </div>
          {/* Premium Users */}
          <div className="bg-gray-100 shadow-md p-6 rounded-lg text-center">
            <p className="text-4xl font-bold text-yellow-600">
              <CountUp end={premiumUsers.length} duration={2} />
            </p>
            <p className="text-gray-500">Premium Users</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Statistics;
