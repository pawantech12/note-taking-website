import React from "react";
import AccountMenu from "./AccountMenu";
import { MenuOutlined } from "@mui/icons-material";

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="flex justify-between items-center h-20 bg-white m-6 px-5 py-1 rounded-lg shadow-[0_0px_40px_rgb(0,0,0,0.05)] align-top z-10">
      <div className="logo flex items-center gap-3">
        <div className="">
          <button
            onClick={toggleSidebar}
            className="text-neutral-800 focus:outline-none"
          >
            <MenuOutlined className="!w-8 !h-8" />
          </button>
        </div>
        <img
          src="https://templates.iqonic.design/note-plus/html/assets/images/logo.png"
          alt="NotePlus Logo Image"
          className="w-12"
        />
      </div>
      <div className="account">
        <AccountMenu />
      </div>
    </nav>
  );
};

export default Navbar;
