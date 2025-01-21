import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddArticlePage = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [publishers, setPublishers] = useState([]);
  const [selectedPublisher, setSelectedPublisher] = useState(null);
  const [tags, setTags] = useState([]);
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const tagOptions = [
    { value: "tech", label: "Tech" },
    { value: "health", label: "Health" },
    { value: "business", label: "Business" },
    { value: "education", label: "Education" },
  ];

  useEffect(() => {
    // Fetch publishers (Admin added)
    const fetchPublishers = async () => {
      try {
        const response = await axios.get("/api/publishers");
        const options = response.data.map((publisher) => ({
          value: publisher.id,
          label: publisher.name,
        }));
        setPublishers(options);
      } catch (error) {
        console.error("Error fetching publishers:", error);
      }
    };

    fetchPublishers();
  }, []);

  const handleImageUpload = async () => {
    if (!image) return null;
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/your_cloudinary_name/image/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data.secure_url; // Return the uploaded image URL
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadedImageUrl = await handleImageUpload();
    if (!uploadedImageUrl) return alert("Image upload failed!");

    const articleData = {
      title,
      image: uploadedImageUrl,
      publisher: selectedPublisher?.value,
      tags: tags.map((tag) => tag.value),
      description,
    };

    try {
      await axios.post("/api/articles", articleData);
      alert("Article submitted successfully! Awaiting admin approval.");
      navigate("/dashboard"); // Redirect to the dashboard
    } catch (error) {
      console.error("Error submitting article:", error);
      alert("Failed to submit the article.");
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
