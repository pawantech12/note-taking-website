import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import OTPpage from "./pages/OTPpage.jsx";
import UpdatePassword from "./pages/UpdatePassword.jsx";
import Dashboard from "./components/Dashboard.jsx";
import YourNotes from "./pages/YourNotes.jsx";
import CreateNote from "./pages/CreateNote.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import DraftNotes from "./pages/DraftNotes.jsx";
import EditNote from "./pages/EditNote.jsx";
import { AuthProvider } from "./stores/auth.jsx";
import Logout from "./pages/Logout.jsx";
import Homepage from "./pages/Homepage.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <App element={<Homepage />} />
      </>
    ),
  },
  {
    path: "/about",
    element: (
      <>
        <App element={<About />} />
      </>
    ),
  },
  {
    path: "/contact",
    element: (
      <>
        <App element={<Contact />} />
      </>
    ),
  },
  {
    path: "/register",
    element: (
      <>
        <Register />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Login />
      </>
    ),
  },
  {
    path: "/logout",
    element: (
      <>
        <Logout />
      </>
    ),
  },
  {
    path: "/forgot-pass",
    element: (
      <>
        <ForgotPassword />
      </>
    ),
  },
  {
    path: "/otp-page",
    element: (
      <>
        <OTPpage />
      </>
    ),
  },
  {
    path: "/update-pass",
    element: (
      <>
        <UpdatePassword />
      </>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <>
        <Dashboard />
      </>
    ),
  },
  {
    path: "/dashboard/your-notes",
    element: (
      <>
        <Dashboard element={<YourNotes />} />
      </>
    ),
  },
  {
    path: "/dashboard/draft-notes",
    element: (
      <>
        <Dashboard element={<DraftNotes />} />
      </>
    ),
  },
  {
    path: "/dashboard/create-note",
    element: (
      <>
        <Dashboard element={<CreateNote />} />
      </>
    ),
  },
  {
    path: "/dashboard/edit-note/:noteID",
    element: (
      <>
        <Dashboard element={<EditNote />} />
      </>
    ),
  },
  {
    path: "/dashboard/myprofile",
    element: (
      <>
        <Dashboard element={<MyProfile />} />
      </>
    ),
  },
  {
    path: "/dashboard/edit-profile/:userID",
    element: (
      <>
        <Dashboard element={<EditProfile />} />
      </>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
