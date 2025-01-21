import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../../Context/ContextProvider";

const AddArticlePage = () => {
  const { apiUrl } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [publishers, setPublishers] = useState([]);
  const [selectedPublisher, setSelectedPublisher] = useState(null);
  const [tags, setTags] = useState([]);
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  const tagOptions = [
    { value: "tech", label: "Tech" },
    { value: "health", label: "Health" },
    { value: "business", label: "Business" },
    { value: "education", label: "Education" },
  ];

  useEffect(() => {
    // Fetch publishers
    // const fetchPublishers = async () => {
    //   try {
    //     const response = await axios.get("/api/publishers");
    //     const options = response.data.map((publisher) => ({
    //       value: publisher.id,
    //       label: publisher.name,
    //     }));
    //     setPublishers(options);
    //   } catch (error) {
    //     console.error("Error fetching publishers:", error);
    //   }
    // };
    // fetchPublishers();
    // Example data for publishers
    setPublishers([
      { value: 1, label: "Publisher 1" },
      { value: 2, label: "Publisher 2" },
      { value: 3, label: "Publisher 3" },
    ]);
  }, []);

  const handleImageUpload = async () => {
    if (!image) {
      toast.error("Please select an image to upload!");
      return null;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "my_upload_preset");

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

    toast.info("Uploading image...");
    const uploadedImageUrl = await handleImageUpload();

    if (!uploadedImageUrl) {
      toast.error("Cannot submit the article without a valid image.");
      return;
    }

    const articleData = {
      title,
      image: uploadedImageUrl,
      publisher: selectedPublisher?.value,
      tags: tags.map((tag) => tag.value),
      description,
    };
    console.log(articleData);

    try {
      await axios.post(`${apiUrl}/api/articles`, articleData);
      toast.success("Article submitted successfully! Awaiting admin approval.");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting article:", error);
      toast.error("Failed to submit the article. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Article</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full p-2 border rounded"
          accept="image/*"
          required
        />

        <Select
          options={publishers}
          onChange={setSelectedPublisher}
          placeholder="Select Publisher"
          className="w-full"
          isSearchable
        />

        <Select
          options={tagOptions}
          onChange={setTags}
          isMulti
          placeholder="Select Tags"
          className="w-full"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          rows="5"
          required
        ></textarea>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Submit Article
        </button>
      </form>
    </div>
  );
};

export default AddArticlePage;
