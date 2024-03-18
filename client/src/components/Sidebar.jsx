import React, { useEffect } from "react";
import ButtonComponent from "./ButtonComponent";
import { Link } from "react-router-dom";
import {
  CloseOutlined,
  FeedOutlined,
  FolderCopyOutlined,
} from "@mui/icons-material";
import Divider from "./Divider";
import AOS from "aos";
import "aos/dist/aos.css";

const Sidebar = ({ isSidebarOpen, menuref, toggleSidebar }) => {
  useEffect(() => {
    AOS.init();
    // console.log(window.location.pathname);
  }, []);
  return (
    <aside
      className={`w-72 absolute h-[90vh] bg-white m-6 px-5 py-1 rounded-lg shadow-[0_0px_40px_rgb(0,0,0,0.05)] ${
        isSidebarOpen ? "left-0" : "-left-full"
      } z-20`}
      ref={menuref}
      data-aos="ease-in-out"
    >
      <div className="flex justify-between items-center">
        <div className="flex my-4 items-center gap-4">
          <img
            src="https://templates.iqonic.design/note-plus/html/assets/images/logo.png"
            alt="NotePlus Logo Image"
            className="w-1/4"
          />
          <span className="font-medium text-2xl">NotePlus</span>
        </div>
        <button onClick={toggleSidebar}>
          <CloseOutlined className="!w-8 !h-8" />
        </button>
      </div>
      <Divider />
      <ButtonComponent text="Add Note" />
      <ul className="linklist mt-6 flex flex-col gap-4">
        <li>
          <Link
            to="/dashboard/your-notes"
            className="flex w-full items-center gap-3 text-slate-500 hover:text-neutral-900 text-lg font-[400]"
          >
            <FeedOutlined /> Your Notes
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard/draft-notes"
            className="flex w-full items-center gap-3 text-slate-500 hover:text-neutral-900 text-lg font-[400]"
          >
            <FolderCopyOutlined /> Draft Notes
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
