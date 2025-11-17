import React from "react";
import NoteCard from "./NoteCard";

export default function NotesGrid({ notes, onOpen, onDelete }) {
  if (!notes || notes.length === 0) {
    return <div className="p-6 text-gray-500">No notes found.</div>;
  }

  return (
    <div className="p-6 container-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} onOpen={onOpen} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}
