import React, { useState } from "react";
import { Link } from "react-router-dom";

const LandingNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex !justify-between items-center px-5 py-3 h-20 bg-neutral-800">
      <div className="flex justify-center items-center gap-3">
        <img
          src="https://templates.iqonic.design/note-plus/html/assets/images/logo.png"
          alt="NotePlus Logo Image"
          className="w-12 bg-white p-[5px] rounded-2xl"
        />
        <span className="font-medium text-2xl text-white">NotePlus</span>
      </div>
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={!isOpen ? "M4 6h16M4 12h16m-7 6h7" : "M6 18L18 6M6 6l12 12"}
            />
          </svg>
        </button>
      </div>
      <ul
        className={`md:flex ${
          isOpen ? "flex" : "hidden"
        } flex-col gap-4 md:flex-row md:gap-6 items-center text-lg text-white font-normal max-md:absolute max-md:right-[5%] max-md:top-[13%] w-64 md:w-fit max-md:py-4 max-md:py-6 max-md:bg-white max-md:rounded-lg`}
      >
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <div className="btn flex flex-col md:flex md:flex-row items-center gap-6 max-md:gap-4">
          <button className="bg-white text-neutral-800 px-7 py-2 hover:bg-neutral-800 hover:text-white hover:border-white hover:border-2  font-semibold rounded-md">
            {" "}
            <Link to="/login">Log In</Link>
          </button>
          <button className="bg-transparent text-white font-semibold px-6 py-2 hover:bg-white hover:text-neutral-800 border-2 border-white rounded-md">
            {" "}
            <Link to="/register">Sign Up</Link>
          </button>
        </div>
      </ul>
    </nav>
  );
};

export default LandingNavbar;
