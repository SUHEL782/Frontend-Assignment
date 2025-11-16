import React from "react";
import dayjs from "dayjs";

export default function NoteCard({ note, onOpen, onDelete }) {
  return (
    <div
      onClick={() => onOpen(note)}
      className="bg-white border rounded-md p-4 shadow-sm hover:shadow-md cursor-pointer flex flex-col justify-between"
    >
      <div>
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-semibold text-lg">{note.title}</h3>
          <div className="text-xs text-gray-500">{note.category}</div>
        </div>

        <p className="text-sm text-gray-600 mt-2 line-clamp-3">
          {note.description}
        </p>
      </div>

      <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
        <div>{dayjs(note.createdAt).format("MMM D, YYYY — hh:mm A")}</div>
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(note.id); }}
            className="text-red-500"
            title="Delete"
          >
            🗑
          </button>
          <button onClick={(e) => { e.stopPropagation(); onOpen(note); }} title="Edit">✏️</button>
        </div>
      </div>
    </div>
  );
}
