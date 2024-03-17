import React, { useState } from "react";
import { Link } from "react-router-dom";

const LandingNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex !justify-between items-center px-5 py-3">
      <div className="flex justify-center items-center gap-3">
        <img
          src="https://templates.iqonic.design/note-plus/html/assets/images/logo.png"
          alt="NotePlus Logo Image"
          className="w-12"
        />
        <span className="font-medium text-2xl">NotePlus</span>
      </div>
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="text-neutral-800 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={!isOpen && "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>
      </div>
      <ul
        className={`md:flex ${
          isOpen ? "flex" : "hidden"
        } flex-col gap-3 md:flex-row md:gap-6 items-center text-lg font-normal max-md:absolute max-md:right-2 max-md:top-0 w-80 md:w-fit max-md:py-4 max-md:py-4`}
      >
        <div className="flex items-center justify-between w-full  md:hidden">
          <div className="flex justify-center items-center gap-3">
            <img
              src="https://templates.iqonic.design/note-plus/html/assets/images/logo.png"
              alt="NotePlus Logo Image"
              className="w-12"
            />
            <span className="font-medium text-2xl">NotePlus</span>
          </div>

          <button
            onClick={toggleMenu}
            className="text-neutral-800 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen && "M6 18L18 6M6 6l12 12"}
              />
            </svg>
          </button>
        </div>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <div className="btn flex flex-col md:flex md:flex-row items-center gap-2 md:gap-6">
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
