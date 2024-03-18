import { Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Divider from "../components/Divider";
import { useAuth } from "../stores/auth";

const MyProfile = () => {
  const { token } = useAuth();
  const [userData, setUserData] = useState({});
  const [userID, setUserID] = useState();
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  // fetching user data using token
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://note-taking-website.onrender.com/api/auth/user`,
          {
            method: "GET",
            headers: {
              Authorization: token,
            },
          }
        );
        const userData = await response.json();
        setUserData(userData);
        setUserID(userData._id);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token]);
  return (
    <div className="bg-white m-6 px-7 py-6 rounded-lg shadow-[0_0px_40px_rgb(0,0,0,0.05)]">
      <div className="container-header flex justify-between items-center mb-3">
        <h2 className="text-2xl">My Profile</h2>
        <Button
          variant="filled"
          className="w-fit bg-neutral-800 py-2 px-4 rounded-lg hover:bg-neutral-950 text-left text-white text-base"
        >
          <Link to={`/dashboard/edit-profile/${userID}`}>Edit</Link>
        </Button>
      </div>
      <Divider />
      <div className="form">
        <form action="" className="flex flex-col gap-6">
          <div className="name-input flex justify-between gap-7 max-sm:flex-col max-sm:gap-5">
            <div className="input flex flex-col w-1/2 max-sm:w-full">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                className="mt-2 outline-none px-2 h-11 rounded-lg border-2 border-zinc-200 bg-violet-50 text-slate-500 text-base font-normal focus:bg-white"
                defaultValue={userData ? userData.firstname : ""}
                id="firstName"
                readOnly
                placeholder="Firstname"
              />
            </div>
            <div className="input flex flex-col w-1/2 max-sm:w-full">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                className="mt-2 outline-none px-2 h-11 rounded-lg border-2 border-zinc-200 bg-violet-50 text-slate-500 text-base font-normal focus:bg-white"
                defaultValue={userData ? userData.lastname : ""}
                readOnly
                id="lastName"
                placeholder="Lastname"
              />
            </div>
          </div>
          <div className="flex justify-between gap-7 max-sm:flex-col max-sm:gap-5">
            <div className="input flex flex-col w-1/2 max-sm:w-full">
              <label htmlFor="city">City:</label>
              <input
                type="text"
                className="mt-2 outline-none px-2 h-11 rounded-lg border-2 border-zinc-200 bg-violet-50 text-slate-500 text-base font-normal focus:bg-white"
                defaultValue={userData ? userData.city : ""}
                readOnly
                id="city"
                placeholder="City"
              />
            </div>
            <div className="input flex flex-col w-1/2 max-sm:w-full">
              <label htmlFor="state">State:</label>
              <input
                type="text"
                className="mt-2 outline-none px-2 h-11 rounded-lg border-2 border-zinc-200 bg-violet-50 text-slate-500 text-base font-normal focus:bg-white"
                defaultValue={userData ? userData.state : ""}
                readOnly
                id="state"
                placeholder="State"
              />
            </div>
          </div>
          <div className="flex justify-between gap-7 max-sm:flex-col max-sm:gap-5">
            <div className="input flex flex-col w-1/2 max-sm:w-full">
              <label htmlFor="country">Country:</label>
              <input
                type="text"
                className="mt-2 outline-none px-2 h-11 rounded-lg border-2 border-zinc-200 bg-violet-50 text-slate-500 text-base font-normal focus:bg-white"
                defaultValue={userData ? userData.country : ""}
                readOnly
                id="country"
                placeholder="country"
              />
            </div>
            <div className="input flex flex-col w-1/2 max-sm:w-full">
              <label htmlFor="dob">Date Of Birth:</label>
              <input
                type="date"
                className="mt-2 outline-none px-2 h-11 rounded-lg border-2 border-zinc-200 bg-violet-50 text-slate-500 text-base font-normal focus:bg-white"
                defaultValue={formatDate(userData?.dob)}
                readOnly
                id="dob"
                placeholder="dob"
              />
            </div>
          </div>
          <div className="flex justify-between gap-7 max-sm:flex-col max-sm:gap-5">
            <div className="input flex flex-col w-1/2 max-sm:w-full">
              <label htmlFor="gender">Gender:</label>
              <input
                type="text"
                className="mt-2 outline-none px-2 h-11 rounded-lg border-2 border-zinc-200 bg-violet-50 text-slate-500 text-base font-normal focus:bg-white"
                defaultValue={userData ? userData.gender : ""}
                readOnly
                id="gender"
              />
            </div>
            <div className="input flex flex-col w-1/2 max-sm:w-full">
              <label htmlFor="age">Age:</label>
              <input
                type="number"
                className="mt-2 outline-none px-2 h-11 rounded-lg border-2 border-zinc-200 bg-violet-50 text-slate-500 text-base font-normal focus:bg-white"
                defaultValue={userData ? userData.age : ""}
                readOnly
                id="age"
                min={0}
                placeholder="age"
              />
            </div>
          </div>
          <div className="input w-full flex flex-col">
            <label htmlFor="address">Address:</label>
            <textarea
              className="mt-2 outline-none px-2 rounded-lg border-2 border-zinc-200 bg-violet-50 text-slate-500 text-base font-normal focus:bg-white"
              defaultValue={userData ? userData.address : ""}
              id="Address"
              readOnly
              cols="30"
              rows="5"
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
