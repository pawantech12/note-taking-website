import React from "react";
import ButtonComponent from "./ButtonComponent";
import { Link } from "react-router-dom";
import { FeedOutlined, FolderCopyOutlined } from "@mui/icons-material";
import Divider from "./Divider";

const Sidebar = () => {
  return (
    <aside className="w-1/5 h-[90vh] bg-white m-6 px-5 py-1 rounded-lg shadow-[0_0px_40px_rgb(0,0,0,0.05)] fixed">
      <div className="flex my-4 items-center gap-4">
        <img
          src="https://templates.iqonic.design/note-plus/html/assets/images/logo.png"
          alt="NotePlus Logo Image"
          className="w-1/4"
        />
        <span className="font-medium text-2xl">NotePlus</span>
      </div>
      <Divider />
      <ButtonComponent text="Add Note" />
      <ul className="linklist mt-6 flex flex-col gap-4">
        <li>
          <Link
            to="/dashboard/your-notes"
            className="flex items-center gap-3 text-slate-500 hover:text-neutral-900 text-lg font-[400]"
          >
            <FeedOutlined /> Your Notes
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard/draft-notes"
            className="flex items-center gap-3 text-slate-500 hover:text-neutral-900 text-lg font-[400]"
          >
            <FolderCopyOutlined /> Draft Notes
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
