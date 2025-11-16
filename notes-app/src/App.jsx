import React, { useState, useMemo } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import NotesGrid from "./components/NotesGrid";
import NoteModal from "./components/NoteModal";
import useLocalStorage from "./hooks/useLocalStorage";
import { resolveDuplicateTitle } from "./utils/duplicateHandler";

export default function App() {
  const [notes, setNotes] = useLocalStorage("notes", []);
  const [filter, setFilter] = useState("All Notes");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const counts = () => {
    const categoryCount = {};
    notes.forEach((note) => {
      categoryCount[note.category] = (categoryCount[note.category] || 0) + 1;
    });

    return {
      "All Notes": notes.length,
      Work: categoryCount.Work || 0,
      Personal: categoryCount.Personal || 0,
      Ideas: categoryCount.Ideas || 0,
      Other: categoryCount.Other || 0,
    };
  };

  const filtered = useMemo(() => {
    let result = notes;

    if (filter !== "All Notes") {
      result = result.filter((note) => note.category === filter);
    }

    if (search.trim()) {
      const lowerSearch = search.toLowerCase();
      result = result.filter(
        (note) =>
          note.title.toLowerCase().includes(lowerSearch) ||
          note.description.toLowerCase().includes(lowerSearch) ||
          note.category.toLowerCase().includes(lowerSearch)
      );
    }

    return result;
  }, [notes, filter, search]);

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (note) => {
    setEditing(note);
    setModalOpen(true);
  };

  const onSave = (payload) => {
    if (payload.id) {
      setNotes(notes.map((n) => (n.id === payload.id ? payload : n)));
    } else {
      const title = resolveDuplicateTitle(
        notes,
        payload.title,
        payload.category
      );
      setNotes([
        ...notes,
        {
          id: Date.now(),
          title,
          description: payload.description,
          category: payload.category,
          createdAt: new Date().toISOString(),
        },
      ]);
    }
  };

  const onDelete = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar current={filter} onSelect={setFilter} counts={counts()} />

      <div className="flex-1 flex flex-col">
        <Header onAdd={openCreate} onSearch={setSearch} searchValue={search} />

        <NotesGrid notes={filtered} onOpen={openEdit} onDelete={onDelete} />

        <NoteModal
          isOpen={modalOpen}
          existing={editing}
          onClose={() => setModalOpen(false)}
          onSave={onSave}
        />
      </div>
    </div>
  );
}
