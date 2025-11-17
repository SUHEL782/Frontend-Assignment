import React from "react";

const categories = ["All Notes", "Work", "Personal", "Ideas", "Other"];

const colorFor = (cat) => {
  switch (cat) {
    case "Work":
      return "bg-indigo-500";
    case "Personal":
      return "bg-emerald-500";
    case "Ideas":
      return "bg-amber-500";
    default:
      return "bg-gray-400";
  }
};

export default function Sidebar({ current, onSelect, counts, isOpen, onClose }) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:block w-64 bg-white border-r min-h-screen p-4 sticky top-0">
        <h2 className="text-lg font-semibold mb-4">Categories</h2>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li
              key={cat}
              onClick={() => onSelect(cat)}
              className={`flex justify-between items-center px-3 py-2 rounded-md cursor-pointer ${
                current === cat ? "bg-gray-100 font-medium" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full ${colorFor(cat)}`} />
                <span>{cat}</span>
              </div>
              <span className="text-sm text-gray-500">{counts[cat] ?? 0}</span>
            </li>
          ))}
        </ul>
      </aside>

      {/* Mobile overlay sidebar */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/30" onClick={onClose} />
          <nav className="absolute left-0 top-0 bottom-0 w-72 bg-white p-4 overflow-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Categories</h2>
              <button onClick={onClose} className="p-2 rounded-md hover:bg-gray-100">✕</button>
            </div>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li
                  key={cat}
                  onClick={() => { onSelect(cat); onClose(); }}
                  className={`flex justify-between items-center px-3 py-2 rounded-md cursor-pointer ${
                    current === cat ? "bg-gray-100 font-medium" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${colorFor(cat)}`} />
                    <span>{cat}</span>
                  </div>
                  <span className="text-sm text-gray-500">{counts[cat] ?? 0}</span>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
