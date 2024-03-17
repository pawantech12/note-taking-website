import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../stores/auth";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    logout();
    navigate("/login");
    // Additional actions after logout can be added here
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div>
      <h1>Logout Page</h1>
      {/* You can add a message or redirect users after logging out */}
    </div>
  );
};

export default Logout;
