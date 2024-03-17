import React, { useState } from "react";
import Divider from "../components/Divider";
import DraftNoteCardList from "../components/DraftNoteCardList";

const DraftNotes = () => {
  return (
    <div className="notes-container bg-white min-h-[70vh] m-6 px-7 py-6 rounded-lg shadow-[0_0px_40px_rgb(0,0,0,0.05)]">
      <div className="container-header mb-3">
        <h2 className="text-2xl">Draft Notes</h2>
      </div>
      <Divider />

      <DraftNoteCardList />
    </div>
  );
};

export default DraftNotes;
