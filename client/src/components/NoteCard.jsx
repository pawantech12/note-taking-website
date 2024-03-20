import { Button } from "@material-tailwind/react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  CalendarMonthRounded,
  DeleteOutline,
  EditOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../stores/auth";

const NoteCard = ({ title, content, createdAt, noteID, onViewNote }) => {
  useEffect(() => {
    AOS.init();
    // console.log(window.location.pathname);
  }, []);
  const { token } = useAuth();
  const navigate = useNavigate();
  // console.log(navigate);

  // creating delete note function by taking note id as parameter
  const handleDeleteNote = async (id) => {
    try {
      let response = await fetch(
        `https://note-taking-website.onrender.com/api/notes/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: token },
        }
      );
      if (!response.ok) {
        console.log("Error occurred while deleting the note.");
      } else {
        console.log("Note deleted successfully.");
      }
      // console.log(window.location.pathname);
      navigate("/dashboard");
    } catch (error) {
      console.log(`Error! ${error}`);
    }
  };
  const limitContent = (content, limit) => {
    return content.length > limit
      ? content.substring(0, limit) + "..."
      : content;
  };
  return (
    <div
      className="bg-white rounded-lg shadow w-72 px-5 py-4 mb-8 max-sm:w-full"
      data-aos="fade-up"
    >
      <h1 className="text-xl font-medium">{title}</h1>
      <p className="mt-3 text-gray-500 font-normal">
        {limitContent(content, 100)}
      </p>
      <div className="flex justify-between items-center mt-2 max-[426px]:flex-col">
        <span className="flex items-center max-[426px]:items-start self-baseline gap-1 text-sm text-neutral-900 font-medium">
          {" "}
          <CalendarMonthRounded />
          {createdAt}
        </span>
        <div className="action-button flex justify-between max-[426px]:mt-3 items-center gap-1 max-[426px]:w-full">
          <Button className="text-black w-fit px-2 py-1 max-[426px]:w-1/4 max-[426px]:p-2 hover:bg-neutral-900 hover:text-white">
            <Link to={`/dashboard/edit-note/${noteID}`}>
              <EditOutlined className="!w-full" />
            </Link>
          </Button>
          <Button
            className="text-black w-fit px-2 py-1 max-[426px]:w-1/4 max-[426px]:p-2 hover:bg-neutral-900 hover:text-white"
            onClick={onViewNote}
          >
            <VisibilityOutlined className="!w-5" />
          </Button>

          <Button
            className="text-black w-fit px-2 py-1 max-[426px]:w-1/4 max-[426px]:p-2 hover:bg-neutral-900 hover:text-white"
            onClick={() => handleDeleteNote(noteID)}
          >
            <DeleteOutline className="!w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
