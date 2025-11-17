import React, { useState, useMemo } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import NotesList from "./components/NotesList";
import NoteViewer from "./components/NoteViewer";
import NoteModal from "./components/NoteModal";
import useLocalStorage from "./hooks/useLocalStorage";
import { resolveDuplicateTitle } from "./utils/duplicateHandler";

export default function App() {
  const [notes, setNotes] = useLocalStorage("notes", []);
  const [filter, setFilter] = useState("All Notes");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [selected, setSelected] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const openSelect = (note) => {
    setSelected(note);
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
    if (selected && selected.id === id) setSelected(null);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar current={filter} onSelect={setFilter} counts={counts()} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="hidden md:flex flex-col w-80 border-r bg-gray-100">
        <div className="p-4">
          <Header onAdd={openCreate} onSearch={setSearch} searchValue={search} onToggleSidebar={() => setSidebarOpen(true)} />
        </div>
        <div className="p-4 overflow-auto">
          <NotesList notes={filtered} selectedId={selected?.id} onSelect={openSelect} onDelete={onDelete} />
        </div>
      </div>

      <main className="flex-1 p-6">
        {/* On small screens show header and list stacked */}
        <div className="md:hidden">
          <Header onAdd={openCreate} onSearch={setSearch} searchValue={search} onToggleSidebar={() => setSidebarOpen(true)} />
          <div className="mt-4">
            <NotesList notes={filtered} selectedId={selected?.id} onSelect={openSelect} onDelete={onDelete} />
          </div>
        </div>

        {/* Right viewer */}
        <div className="mt-4">
          <NoteViewer note={selected} onEdit={(n) => { setEditing(n); setModalOpen(true); }} onDelete={onDelete} />
        </div>

        <NoteModal
          isOpen={modalOpen}
          existing={editing}
          onClose={() => setModalOpen(false)}
          onSave={(payload) => {
            onSave(payload);
            // if created or updated, refresh selection to the new/updated note
            if (!payload.id) {
              // newly created note will be last in notes array after onSave
              const latest = notes[notes.length] || null; // fallback
              // cannot reliably get new id here — simply close modal
            }
          }}
        />
      </main>
    </div>
  );
}
