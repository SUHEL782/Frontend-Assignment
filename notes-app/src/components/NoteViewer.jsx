import React from "react";
import dayjs from "dayjs";

export default function NoteViewer({ note, onEdit, onDelete }) {
  if (!note) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        <div className="text-center">
          <div className="text-lg font-semibold mb-2">No note selected</div>
          <div className="text-sm">Select a note to view or create a new one.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 bg-white rounded-md shadow-sm overflow-auto">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-semibold leading-tight">{note.title}</h2>
          <div className="text-sm text-gray-400 mt-1">{dayjs(note.createdAt).format('MMM D, YYYY — hh:mm A')}</div>
        </div>

        <div className="flex items-center gap-3 viewer-actions">
          <button onClick={() => onEdit(note)} className="px-3 py-1 border rounded-md">Edit</button>
          <button onClick={() => { if (window.confirm('Delete this note?')) onDelete(note.id); }} className="px-3 py-1 bg-red-50 text-red-700 rounded-md border border-red-100">Delete</button>
        </div>
      </div>

      <div className="prose max-w-none text-gray-800 whitespace-pre-wrap" style={{ fontSize: '1.02rem' }}>{note.description}</div>
    </div>
  );
}
