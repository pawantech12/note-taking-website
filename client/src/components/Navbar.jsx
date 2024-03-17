import React from "react";
import AccountMenu from "./AccountMenu";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center h-20 bg-white m-6 px-5 py-1 rounded-lg shadow-[0_0px_40px_rgb(0,0,0,0.05)]">
      <div className="logo">
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
