import React from "react";
import dayjs from "dayjs";

const pillColor = (cat) => {
  switch (cat) {
    case "Work":
      return "bg-indigo-100 text-indigo-800";
    case "Personal":
      return "bg-emerald-100 text-emerald-800";
    case "Ideas":
      return "bg-amber-100 text-amber-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function NoteCard({ note, onOpen, onDelete }) {
  return (
    <article
      onClick={() => onOpen(note)}
      className="group bg-white border rounded-lg p-4 shadow-sm hover:shadow-md cursor-pointer flex flex-col justify-between h-full"
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="font-semibold text-base line-clamp-2">{note.title}</h3>
            <div className="text-gray-500 text-xs mt-1">{dayjs(note.createdAt).format("MMM D, YYYY")}</div>
          </div>

          <div className="ml-2">
            <span className={`px-2 py-1 rounded-full text-xs ${pillColor(note.category)}`}>{note.category}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 mt-3 line-clamp-3">{note.description}</p>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-xs text-gray-500">{dayjs(note.createdAt).format("hh:mm A")}</div>
        <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => { e.stopPropagation(); onOpen(note); }}
            className="text-gray-600 hover:text-gray-900"
            title="Edit"
          >
            
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); if(window.confirm('Delete this note?')) onDelete(note.id); }}
            className="text-red-500 hover:text-red-700"
            title="Delete"
          >
            
          </button>
        </div>
      </div>
    </article>
  );
}
