import React from "react";
import dayjs from "dayjs";

export default function NotesList({ notes, selectedId, onSelect, onDelete }) {
  if (!notes || notes.length === 0) {
    return <div className="p-6 text-gray-500">No notes found.</div>;
  }

  return (
    <div className="divide-y bg-white rounded-md overflow-hidden shadow-sm">
      {notes.map((note) => {
        const isSelected = selectedId === note.id;
        return (
          <div key={note.id} className={`${isSelected ? 'selected' : ''}`}>
            <button
              onClick={() => onSelect(note)}
              className="w-full text-left p-4 flex items-start gap-4 notes-list-item"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-medium text-sm truncate">{note.title}</h3>
                  <div className="text-xs text-gray-400">{dayjs(note.createdAt).format('MMM D')}</div>
                </div>
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">{note.description}</p>
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
}
