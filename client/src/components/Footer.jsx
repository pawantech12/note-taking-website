import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  // Get the current year dynamically
  const currentYear = new Date().getFullYear();
  return (
    <footer className="flex justify-between max-sm:flex-col items-center relative bottom-0 bg-white m-6 px-5 py-3 rounded-lg shadow-[0_0px_40px_rgb(0,0,0,0.05)]">
      <div className="flex items-center gap-2">
        <Link to="/dashboard/privacy-policy" className=" text-slate-500">
          Privacy Policy
        </Link>
        <Link to="/dashboard/term-of-use" className="text-slate-500">
          Terms of Use
        </Link>
      </div>
      <div>
        <p>&copy; {currentYear} NotePlus. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
