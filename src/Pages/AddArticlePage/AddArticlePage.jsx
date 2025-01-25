import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../../Context/ContextProvider";
import useGetPublisherData from "../../Hook/useGetPublisherData";
import { useAxiospublic } from "../../Hook/useAxiospublic";
import useLoginUserInfo from "../../Hook/useLoginUserInfo";
import useAxiosSequre from "../../Hook/useAxiosSequre";

const AddArticlePage = () => {
  const { apiUrl, user } = useContext(AppContext);
  const axiosPublic = useAxiospublic();
  const axiosSequre = useAxiosSequre();
  const [data, isLoading, refetch] = useGetPublisherData();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [publishers, setPublishers] = useState([]);
  const [selectedPublisher, setSelectedPublisher] = useState(null);
  const [tags, setTags] = useState([]);
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const [userLoginInfo] = useLoginUserInfo();

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
    if (data && data.length > 0) {
      const transformedPublishers = data.map((publisher) => ({
        value: publisher._id,
        label: publisher.name,
      }));
      setPublishers(transformedPublishers);
    }
  }, [data]);

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

    // Check if the user is allowed to post an article
    try {
      const response = await axiosSequre.get(`/api/checklimit`, {
        params: { email: user?.email },
      });
      if (response.data.isAllowed) {
        const uploadedImageUrl = await handleImageUpload();
        if (!uploadedImageUrl) {
          toast.error("Cannot submit the article without a valid image.");
          return;
        }
        toast.info("Uploading image...");

        const articleData = {
          title,
          image: uploadedImageUrl,
          authorName: user?.displayName,
          authorEmail: user?.email,
          authorPhoto: user?.photoURL,
          publisher: selectedPublisher?.label,
          tags: tags.map((tag) => tag.value),
          description,
        };

        // Post the article
        await axiosPublic.post(`/api/articles`, articleData);
        toast.success(
          "Article submitted successfully! Awaiting admin approval."
        );
        navigate("/");
      } else {
        toast.error(
          "You have reached your posting limit. Upgrade to a premium plan to post more articles."
        );
      }
    } catch (error) {
      console.error("Error checking posting limit:", error);
      toast.error("Failed to check posting limit. Please try again.");
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!userLoginInfo) {
  //     toast.error("User information not found. Please log in.");
  //     return;
  //   }

  //   // Check if the user is a premium user
  //   const isPremium =
  //     userLoginInfo.premiumTaken &&
  //     new Date(userLoginInfo.premiumTaken).getTime() > new Date().getTime();

  //   console.log(isPremium);

  //   toast.info("Uploading image...");
  //   const uploadedImageUrl = await handleImageUpload();

  //   if (!uploadedImageUrl) {
  //     toast.error("Cannot submit the article without a valid image.");
  //     return;
  //   }

  //   const articleData = {
  //     title,
  //     image: uploadedImageUrl,
  //     authorName: user?.displayName,
  //     authorEmail: user?.email,
  //     authorPhoto: user?.photoURL,
  //     publisher: selectedPublisher?.label,
  //     tags: tags.map((tag) => tag.value),
  //     description,
  //   };

  //   try {
  //     await axiosPublic.post(`/api/articles`, articleData);
  //     toast.success("Article submitted successfully! Awaiting admin approval.");
  //     navigate("/");
  //   } catch (error) {
  //     console.error("Error submitting article:", error);
  //     toast.error("Failed to submit the article. Please try again.");
  //   }
  // };

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
          isLoading={isLoading}
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
          className="w-full bg-gradient-to-r   text-white py-2 rounded hover:bg-gradient-to-r from-blue-500 to-green-500"
        >
          Submit Article
        </button>
      </form>
    </div>
  );
};

export default AddArticlePage;
