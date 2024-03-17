import React from "react";
import { Link } from "react-router-dom";

const LandingNavbar = () => {
  return (
    <nav className="flex justify-between px-5 py-3">
      <div className="flex justify-center items-center gap-3">
        <img
          src="https://templates.iqonic.design/note-plus/html/assets/images/logo.png"
          alt="NotePlus Logo Image"
          className="w-12"
        />
        <span className="font-medium text-2xl">NotePlus</span>
      </div>
      <ul className="flex gap-10 items-center text-lg font-normal">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <div className="btn flex items-center gap-6">
          <button className="bg-neutral-800 text-white px-7 py-2 hover:bg-neutral-950 rounded-md">
            {" "}
            <Link to="/login">Log In</Link>
          </button>
          <button className="bg-white text-neutral-800 px-6 py-2 hover:bg-neutral-950 hover:text-white border-2 border-neutral-800 rounded-md">
            {" "}
            <Link to="/register">Sign Up</Link>
          </button>
        </div>
      </ul>
    </nav>
  );
};

export default LandingNavbar;
