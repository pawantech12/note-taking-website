import React from "react";
import { Link } from "react-router-dom";

import {
  DeleteOutline,
  EditNoteOutlined,
  FolderOpenOutlined,
} from "@mui/icons-material";

const Homepage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen text-center gap-7">
        <h1 className="text-6xl max-md:text-4xl font-bold leading-tight">
          <span className="bg-neutral-800 text-white px-4 rounded-md">
            NotePlus
          </span>{" "}
          Your All-in-One <br />
          Note-Taking Hub.
        </h1>
        <p className="text-xl w-1/2 max-md:w-11/12">
          Drowning in sticky notes and scattered thoughts? Struggling to keep
          track of your ideas and to-dos? NotePlus is the answer.
        </p>
        <button className="bg-neutral-800 text-white px-7 py-2 hover:bg-neutral-950 rounded-md text-lg">
          <Link to="/login">Get Started</Link>
        </button>
      </div>
      <div>
        <div className="flex justify-around items-center max-md:flex-col max-md:text-center max-md:gap-4">
          <h2 className="text-4xl font-bold w-[40%] max-md:w-11/12">
            Why is NotePlus a great note taking app for you?
          </h2>
          <p className="w-[40%] max-md:w-11/12 text-xl">
            NotePlus simplifies note-taking with powerful features that let you
            capture ideas, organize thoughts, and refine your workflow.
          </p>
        </div>
        <div className="mt-8">
          <ul className="flex flex-wrap gap-7 my-10 mx-4 justify-center">
            <li className="flex flex-col items-center text-center rounded-md p-6 w-96 border-2 border-neutral-950 gap-2">
              <div className="icon bg-neutral-800 w-fit rounded-full p-4">
                <EditNoteOutlined className="text-white !w-12 !h-12" />
              </div>
              <h3 className="font-semibold text-2xl">
                Effortless Note Creation
              </h3>
              <p className="text-lg">
                Quickly jot down ideas, brainstorm concepts, or draft detailed
                outlines – all within a user-friendly interface.
              </p>
            </li>
            <li className="flex flex-col items-center text-center rounded-md p-6 w-96 border-2 border-neutral-950 gap-2">
              <div className="icon bg-neutral-800 w-fit rounded-full p-4">
                <FolderOpenOutlined className="text-white !w-12 !h-12" />
              </div>
              <h3 className="font-semibold text-2xl">Seamless Organization</h3>
              <p className="text-lg">
                Keep your notes organized with intuitive features like folders,
                tags, and color coding. Find what you need instantly with
                powerful search functionality.
              </p>
            </li>
            <li className="flex flex-col items-center text-center rounded-md p-6 w-96 border-2 border-neutral-950 gap-2">
              <div className="icon bg-neutral-800 w-fit rounded-full p-4">
                <DeleteOutline className="text-white !w-12 !h-12" />
              </div>
              <h3 className="font-semibold text-2xl">Effortless Deletion</h3>
              <p className="text-lg">
                Declutter your workspace by removing outdated notes with a
                single click.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Homepage;
