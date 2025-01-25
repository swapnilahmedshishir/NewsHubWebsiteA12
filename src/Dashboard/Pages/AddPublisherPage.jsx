import React, { useState } from "react";
import { toast } from "react-toastify"; // Assuming you're using react-toastify for notifications
import axios from "axios";
import useAxiosSequre from "../../Hook/useAxiosSequre";
import useGetPublisherData from "../../Hook/useGetPublisherData";

const AddPublisherPage = () => {
  const axiosSecure = useAxiosSequre();
  const [data, isLoading, refetch] = useGetPublisherData();
  const [publisherName, setPublisherName] = useState("");
  const [publisherLogo, setPublisherLogo] = useState(null);
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = "my_upload_preset";

  // Reusable Image Upload Function
  const handleImageUpload = async (image) => {
    if (!image) {
      toast.error("Please select an image to upload!");
      return null;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.secure_url) {
        toast.success("Image uploaded successfully!");
        return response.data.secure_url;
      } else {
        toast.error("Image upload failed!");
        return null;
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("An error occurred during the image upload.");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!publisherName || !publisherLogo) {
      toast.error("Please fill out all fields!");
      return;
    }

    const logoUrl = await handleImageUpload(publisherLogo);
    if (!logoUrl) {
      return;
    }

    const publisherData = {
      name: publisherName,
      logo: logoUrl,
    };

    try {
      const response = await axiosSecure.post("/api/publishers", publisherData);

      if (response.status === 200) {
        toast.success("Publisher added successfully!");
        setPublisherName("");
        setPublisherLogo(null);
        refetch();
      } else {
        toast.error("Failed to submit the Publisher. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting publisher:", error);
      toast.error("Failed to submit the Publisher. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add Publisher</h1>

      {/* Form */}
      <form
        className="bg-white p-6 shadow rounded mb-6"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Publisher Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Enter publisher name"
            value={publisherName}
            onChange={(e) => setPublisherName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Publisher Logo</label>
          <input
            type="file"
            className="w-full p-2 border rounded"
            onChange={(e) => setPublisherLogo(e.target.files[0])}
          />
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-400 to-green-500 text-white px-4 py-2 rounded"
        >
          Add Publisher
        </button>
      </form>

      {/* Table */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Publisher List</h2>
        {isLoading ? (
          <p>Loading publishers...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 px-4 py-2">#</th>
                  <th className="border border-gray-200 px-4 py-2">Logo</th>
                  <th className="border border-gray-200 px-4 py-2">Name</th>
                </tr>
              </thead>
              <tbody>
                {data.map((publisher, index) => (
                  <tr key={publisher._id} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-center">
                      <img
                        src={publisher.logo}
                        alt={publisher.name}
                        className="w-16 h-16 object-cover mx-auto"
                      />
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {publisher.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddPublisherPage;
