import React from "react";

export default function Header({ onAdd, onSearch, searchValue, onToggleSidebar }) {
  return (
    <header className="app-header flex items-center justify-between p-3 md:p-4 sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
          aria-label="Open sidebar"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 6h18M3 12h18M3 18h18" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>

        <div>
          <div className="text-sm text-gray-600">Notes</div>
          <div className="text-xs text-gray-400">All your notes in one place</div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 21l-4.35-4.35" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="11" cy="11" r="6" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <input
            value={searchValue}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search notes"
            className="border rounded-md pl-9 pr-3 py-2 w-44 sm:w-72 focus:outline-none"
          />
        </div>

        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded-md shadow-sm hover:shadow-md"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span className="text-sm">New</span>
        </button>
      </div>
    </header>
  );
}
