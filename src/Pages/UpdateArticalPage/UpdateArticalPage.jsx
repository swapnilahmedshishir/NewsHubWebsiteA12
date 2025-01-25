import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../../Context/ContextProvider";
import useAxiosSequre from "../../Hook/useAxiosSequre";

const UpdateArticlePage = () => {
  const { id } = useParams(); // Extract article ID from the URL
  const { apiUrl } = useContext(AppContext);
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const axiosSecure = useAxiosSequre();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [publishers, setPublishers] = useState([]);
  const [selectedPublisher, setSelectedPublisher] = useState(null);
  const [tags, setTags] = useState([]);
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  const tagOptions = [
    { value: "tech", label: "Tech" },
    { value: "health", label: "Health" },
    { value: "business", label: "Business" },
    { value: "education", label: "Education" },
    { value: "politics", label: "Politics" },
    { value: "science", label: "Science" },
    { value: "news", label: "News" },
  ];

  useEffect(() => {
    const fetchArticleDetails = async () => {
      try {
        const response = await axiosSecure.get(`/api/articles/${id}`);
        const data = response.data;
        setArticle(data);
        setTitle(data.title);
        setCurrentImage(data.image);
        setDescription(data.description);
        setSelectedPublisher({ value: data.publisher, label: data.publisher });
        setTags(data.tags.map((tag) => ({ value: tag, label: tag })));
      } catch (error) {
        toast.error("Failed to fetch article details.");
      } finally {
        setIsLoading(false);
      }
    };

    const fetchPublishers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/publishers`);
        const transformedPublishers = response.data.map((publisher) => ({
          value: publisher._id,
          label: publisher.name,
        }));
        setPublishers(transformedPublishers);
      } catch (error) {
        console.error("Failed to fetch publishers:", error);
      }
    };

    fetchArticleDetails();
    fetchPublishers();
  }, [id, apiUrl]);

  const handleImageUpload = async () => {
    if (!image) return currentImage; // Keep the existing image if no new one is uploaded

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "my_upload_preset");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image.");
      return currentImage; // Fallback to the current image
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    toast.info("Updating article...");

    const uploadedImageUrl = await handleImageUpload();

    const updatedArticle = {
      title,
      image: uploadedImageUrl,
      publisher: selectedPublisher?.label,
      tags: tags.map((tag) => tag.value),
      description,
    };

    try {
      await axiosSecure.put(`/api/articles/${id}`, updatedArticle);
      toast.success("Article updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating article:", error);
      toast.error("Failed to update the article.");
    }
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading article...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Update Article</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        {/* Title */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 border rounded"
          required
        />

        {/* Image */}
        <div>
          <label className="block mb-2">Current Image</label>
          <img
            src={currentImage}
            alt="Current"
            className="w-32 h-32 object-cover mb-4"
          />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-2 border rounded"
            accept="image/*"
          />
        </div>

        {/* Publisher */}
        <Select
          options={publishers}
          value={selectedPublisher}
          onChange={setSelectedPublisher}
          placeholder="Select Publisher"
          className="w-full"
          isSearchable
        />

        {/* Tags */}
        <Select
          options={tagOptions}
          value={tags}
          onChange={setTags}
          isMulti
          placeholder="Select Tags"
          className="w-full"
        />

        {/* Description */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-2 border rounded"
          rows="5"
          required
        ></textarea>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-400 to-green-500 text-white py-2 rounded hover:bg-gradient-to-r from-blue-500 to-green-500"
        >
          Update Article
        </button>
      </form>
    </div>
  );
};

export default UpdateArticlePage;
