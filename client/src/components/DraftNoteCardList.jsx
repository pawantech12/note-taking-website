import React, { useEffect, useState } from "react";
import NoteCard from "./NoteCard";
import { useAuth } from "../stores/auth";
import Modal from "./Modal";

const DraftNoteCardList = () => {
  const [resdata, setResData] = useState(null);
  const [noNotesMessage, setNoNotesMessage] = useState(false);

  const [selectedNote, setSelectedNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleViewNote = (note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNote(null);
  };
  const formatDate = (mongoDate) => {
    const date = new Date(mongoDate);
    const options = { day: "numeric", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };
  const { token } = useAuth();
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        let response = await fetch(
          `https://note-taking-website.onrender.com/api/notes?status=draft`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );
        let resdata = await response.json();
        console.log(resdata);
        if (resdata.length === 0) {
          setNoNotesMessage(true); // Set state to show message if there are no notes
        }
        setResData(resdata);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNotes();
  }, [token]);
  return (
    <div className="bg-zinc-50 p-4 mt-2 rounded flex gap-2 h-fit relative">
      {noNotesMessage ? ( // Display message if there are no notes
        <p className="bg-neutral-600 text-white text-center py-2 rounded-md mb-4 w-full">
          No notes Drafted yet.
        </p>
      ) : (
        resdata &&
        resdata.map((note) => (
          <NoteCard
            key={note._id}
            noteID={note._id}
            title={note.title}
            content={note.content}
            createdAt={formatDate(note.createdAt)}
            onViewNote={() => handleViewNote(note)}
          />
        ))
      )}
      {isModalOpen && (
        <Modal
          title={selectedNote.title}
          content={selectedNote.content}
          createdAt={formatDate(selectedNote.createdAt)}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default DraftNoteCardList;
