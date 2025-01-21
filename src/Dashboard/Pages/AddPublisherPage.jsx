import React, { useState } from "react";

const AddPublisherPage = () => {
  const [publisherName, setPublisherName] = useState("");
  const [publisherLogo, setPublisherLogo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!publisherName || !publisherLogo) {
      alert("Please fill out all fields");
      return;
    }

    const formData = new FormData();
    formData.append("image", publisherLogo);

    // Upload image to imgbb
    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    if (data.success) {
      console.log({
        name: publisherName,
        logo: data.data.url,
      });
      alert("Publisher added successfully!");
    } else {
      alert("Image upload failed!");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add Publisher</h1>
      <form className="bg-white p-6 shadow rounded" onSubmit={handleSubmit}>
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
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Publisher
        </button>
      </form>
    </div>
  );
};

export default AddPublisherPage;
