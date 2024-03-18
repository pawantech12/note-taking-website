import React from "react";
import NoteCardList from "../components/NoteCardList";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Divider from "../components/Divider";

const YourNotes = () => {
  return (
    <div className="notes-container bg-white m-6 px-7 py-6 rounded-lg shadow-[0_0px_40px_rgb(0,0,0,0.05)]">
      <div className="container-header flex justify-between items-center mb-3">
        <h2 className="text-2xl">Your Notes</h2>
        <Button
          variant="filled"
          className="w-fit bg-neutral-800 py-2 px-4 rounded-lg hover:bg-neutral-950 text-left text-white text-base"
        >
          <Link to={"/dashboard/create-note"}>Create Note</Link>
        </Button>
      </div>
      <Divider />
      <NoteCardList />
    </div>
  );
};

export default YourNotes;
