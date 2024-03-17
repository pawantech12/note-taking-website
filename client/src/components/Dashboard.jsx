import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../stores/auth";
import Footer from "./Footer";

const Dashboard = ({ element }) => {
  const navigate = useNavigate();
  const { token } = useAuth();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div className="flex justify-between gap-3 bg-slate-100">
      <Sidebar />
      <div className="flex flex-col justify-between right-container w-3/4 ms-80">
        <Navbar />
        {element}
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
