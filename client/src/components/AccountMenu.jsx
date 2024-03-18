import { useEffect, useRef, useState } from "react";
import { Logout, Person2Outlined, SettingsOutlined } from "@mui/icons-material";
import Divider from "./Divider";
import { Link } from "react-router-dom";
import ProfileImg from "../images/profile.jpg";
import AOS from "aos";
import "aos/dist/aos.css";

const AccountMenu = () => {
  useEffect(() => {
    AOS.init();
    // console.log(window.location.pathname);
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();
  const handleLinkClick = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="relative z-50" ref={menuRef}>
      <button
        className="flex items-center space-x-2 bg-lightBlue-500 text-neutral-900 px-3 py-2 rounded-md focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img src={ProfileImg} className="w-12 rounded-lg" alt="" />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-md py-2"
          data-aos="ease-in-out"
        >
          <button className="px-4 py-1 text-base text-gray-700 hover:bg-gray-100 w-full text-left">
            <Link
              to="/dashboard/myprofile"
              onClick={handleLinkClick}
              className="flex items-center gap-2 w-full"
            >
              <Person2Outlined className="!text-xl" /> Profile
            </Link>
          </button>
          <button className="flex items-center gap-2 px-4 py-1 text-base text-gray-700 hover:bg-gray-100 w-full text-left">
            <Link
              to=""
              onClick={handleLinkClick}
              className="flex items-center gap-2 w-full"
            >
              <SettingsOutlined className="!text-xl" /> Settings
            </Link>
          </button>
          <Divider />
          <button className="flex items-center gap-2 px-4 py-1 text-base text-gray-700 hover:bg-gray-100 w-full text-left">
            <Link to="/logout" className="flex items-center gap-2 w-full">
              <Logout className="!text-xl" /> Logout
            </Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountMenu;
