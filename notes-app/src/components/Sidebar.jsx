import React from "react";

const categories = ["All Notes", "Work", "Personal", "Ideas", "Other"];

export default function Sidebar({ current, onSelect, counts }) {
  return (
    <aside className="w-64 bg-white border-r min-h-screen p-4 sticky top-0">
      <h2 className="text-xl font-semibold mb-4">Categories</h2>
      <ul className="space-y-2">
          {categories.map(cat => (
          <li
            key={cat}
            onClick={() => onSelect(cat)}
            className={`flex justify-between items-center px-3 py-2 rounded-md cursor-pointer ${
              current === cat ? "bg-gray-100 font-medium" : "hover:bg-gray-50"
            }`}
          >
            <span>{cat}</span>
            <span className="text-sm text-gray-500">{counts[cat] ?? 0}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
