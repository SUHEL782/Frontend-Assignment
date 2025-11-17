import React, { useState, useEffect } from "react";

const categoryOptions = ["Work", "Personal", "Ideas", "Other"];

export default function NoteModal({ isOpen, existing, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Work");

  useEffect(() => {
    if (existing) {
      setTitle(existing.title || "");
      setDescription(existing.description || "");
      setCategory(existing.category || "Work");
    } else {
      setTitle("");
      setDescription("");
      setCategory("Work");
    }
  }, [existing, isOpen]);

  const handleSave = () => {
    if (!title.trim()) return;
    onSave({
      ...existing,
      title,
      description,
      category,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-xl w-full shadow-lg h-full sm:h-auto sm:rounded-lg sm:max-w-xl sm:mx-auto sm:my-8 overflow-auto">
        <h2 className="text-xl font-semibold mb-4">{existing ? "Edit Note" : "New Note"}</h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-md px-3 py-2 mb-4 focus:outline-none"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded-md px-3 py-2 mb-4 focus:outline-none"
          rows="6"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-md px-3 py-2 focus:outline-none"
          >
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-3 justify-end">
            <button onClick={onClose} className="px-4 py-2 border rounded-md hover:bg-gray-50">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}
