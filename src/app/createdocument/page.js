"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";

function createDocument() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleAddDocument = () => {
    if (!name.trim() || description.trim() || !image) {
      console.log("Plese fill all the details");
    }

    const currentDate = new Date().toLocaleDateString();
    const existingDocuments =
      JSON.parse(localStorage.getItem("documents")) || [];

    const newDocument = {
      id: existingDocuments.length + 1,
      name: name,
      description: description,
      image:image,
      date: currentDate,
    };
    const updatedDocuments = [...existingDocuments, newDocument];
    localStorage.setItem("documents", JSON.stringify(updatedDocuments));
    setName("");
    setDescription("");
    setImage("");
  };
  return (
    <div
      className="  max-w-lg
      mx-auto
      p-6
      border
      border-gray-300
      rounded-lg
      shadow-md
      bg-white"
    >
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
          Document Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="Name"
          value={name}
          className="w-full p-3 border border-gray-300 rounded-md"
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-gray-700 font-medium mb-2"
        >
          Document Description
        </label>
        <textarea
          id="description"
          placeholder="Description"
          value={description}
          className="w-full p-3 border border-gray-300 rounded-md"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
          Set Image
        </label>
        <input
          id="image"
          type="file"
          onChange={handleImageChange}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <Button onClick={handleAddDocument}>Add Document</Button>
      </div>
    </div>
  );
}

export default createDocument;
