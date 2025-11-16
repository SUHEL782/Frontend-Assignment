import React from "react";

export default function Header({ onAdd, onSearch, searchValue }) {
  return (
    <header className="flex items-center justify-between p-4 border-b bg-white sticky top-0 z-10">
      <div>
        <h1 className="text-2xl font-bold">Notes</h1>
        <p className="text-sm text-gray-500">All your notes in one place</p>
      </div>

      <div className="flex items-center gap-3">
        <input
          value={searchValue}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search notes..."
          className="border rounded-md px-3 py-2 w-72 focus:outline-none"
        />
        <button onClick={onAdd} className="bg-black text-white px-4 py-2 rounded-md">
          + Add Note
        </button>
      </div>
    </header>
  );
}
