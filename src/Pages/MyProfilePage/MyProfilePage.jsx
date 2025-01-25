import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../Context/ContextProvider";

const MyProfilePage = () => {
  const { user, updateProfileData } = useContext(AppContext);

  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    photoURL: user?.photoURL || "",
  });
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    setFormData({
      name: user?.displayName || "",
      email: user?.email || "",
      photoURL: user?.photoURL || "",
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedInfo = {
      uid: user.uid,
      name: formData.name,
      photoURL: formData.photoURL,
      email: formData.email,
    };
    const updatedUser = await updateProfileData(updatedInfo);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6">
          My Profile
        </h1>

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 dark:text-gray-300 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 dark:text-gray-300 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="photoURL"
                className="text-gray-700 dark:text-gray-300 mb-2 flex items-center"
              >
                photoURL{" "}
                <img
                  src={formData.photoURL || "/default-avatar.png"}
                  alt="Preview"
                  className="h-8 w-8 rounded-full border-2 border-gray-300 ml-2"
                />
              </label>
              <input
                type="text"
                id="photoURL"
                name="photoURL"
                value={formData.photoURL}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </form>
        ) : (
          <div>
            <div className="mb-4">
              <p className="text-gray-700 dark:text-gray-300 flex gap-3 items-center">
                <strong>Photo :</strong>{" "}
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt="User Profile"
                  className="h-8 w-8 rounded-full border-2 border-gray-300"
                  referrerPolicy="no-referrer"
                />
              </p>
            </div>

            <div className="mb-4">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Name:</strong> {user?.displayName}
              </p>
            </div>
            <div className="mb-4">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Email:</strong> {user?.email}
              </p>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg hover:bg-blue-700"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfilePage;
