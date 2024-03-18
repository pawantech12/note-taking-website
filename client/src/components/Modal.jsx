// Modal Component
import { CalendarMonthRounded, CloseOutlined } from "@mui/icons-material";
import React, { useEffect } from "react";
import Divider from "./Divider";
import AOS from "aos";
import "aos/dist/aos.css";

const Modal = ({ title, content, createdAt, onClose }) => {
  useEffect(() => {
    AOS.init();
    // console.log(window.location.pathname);
  }, []);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-filter">
      <div
        className="modal-content w-1/3 max-lg:w-1/2 max-sm:w-11/12 h-fit bg-white rounded-lg shadow-lg z-50 px-5 py-3"
        data-aos="fade-up"
      >
        <div className="header flex items-center justify-between">
          <h2 className="text-2xl font-medium">{title}</h2>
          <button onClick={onClose}>
            <CloseOutlined />
          </button>
        </div>
        <Divider />
        <p className="text-lg text-slate-500">{content}</p>
        <p className="mt-3 font-medium flex items-center gap-1">
          <CalendarMonthRounded /> {createdAt}
        </p>
      </div>
    </div>
  );
};

export default Modal;
