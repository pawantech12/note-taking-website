import { Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import Divider from "../components/Divider";
import { SystemUpdateAltOutlined } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../stores/auth";
import { useForm } from "react-hook-form";

const EditProfile = () => {
  const { userID } = useParams();
  const { token } = useAuth();
  const [userData, setUserData] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [msg, setMsg] = useState("");
  const [showMessage, setShowMessage] = useState(false);

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
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token]);

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    data.dob = formatDate(data.dob);
    // await delay(2); // simulate server latency
    console.log("before sending user data to backend", data);
    const updatedFields = {};
    Object.keys(data).forEach((key) => {
      if (data[key] !== userData[key]) {
        updatedFields[key] = data[key];
      }
    });

    // sending data to backend using fetch api
    try {
      let response = await fetch(
        `https://note-taking-website.onrender.com/api/auth/user/${userID}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: token },
          body: JSON.stringify(updatedFields),
        }
      );
      let resuserdata = await response.json();
      if (!response.ok) {
        console.log("error occured");
      }
      console.log(`Success! You have Updated User.`);
      console.log("After sending Note data to backend", resuserdata);
      setMsg(resuserdata.message);
      setTimeout(() => {
        setShowMessage(false);
        navigate("/dashboard/myprofile");
      }, 3000);
      setShowMessage(true);
      reset();
    } catch (error) {
      console.log(`Error! ${error}`);
    }
  };

  return (
    <div className="bg-white m-6 px-7 py-6 rounded-lg shadow-[0_0px_40px_rgb(0,0,0,0.05)]">
      <div className="container-header mb-3">
        <h2 className="text-2xl">Edit Profile</h2>
      </div>
      <Divider />
      {showMessage && (
        <p className="bg-neutral-600 text-white text-center py-2 rounded-md mb-4">
          {msg}
        </p>
      )}
      <div className="form">
        <form
          action=""
          className="flex flex-col gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="name-input flex justify-between gap-7 max-sm:flex-col max-sm:gap-5">
            <div className="input flex flex-col w-1/2 max-sm:w-full">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                className="mt-2 outline-none px-2 h-11 rounded-lg border-2 border-zinc-200 bg-violet-50 text-slate-500 text-base font-normal focus:bg-white"
                defaultValue={userData ? userData.firstname : ""}
                {...register("firstname", {
                  required: {
                    value: true,
                    message: "First name is required",
                  },
                  minLength: {
                    value: 5,
                    message: "First name should contain minimum 5 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "First name can only contain upto 20 characters",
                  },
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: "First name can only contain Alphabets",
                  },
                })}
                placeholder="Firstname"
              />
              {errors.firstname && (
                <p className="text-base ms-1 text-red-400">
                  {errors.firstname.message}
                </p>
              )}
            </div>
            <div className="input flex flex-col w-1/2 max-sm:w-full">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                className="mt-2 outline-none px-2 h-11 rounded-lg border-2 border-zinc-200 bg-violet-50 text-slate-500 text-base font-normal focus:bg-white"
                defaultValue={userData ? userData.lastname : ""}
                {...register("lastname", {
                  required: {
                    value: true,
                    message: "Last name is required",
                  },
                  minLength: {
                    value: 3,
                    message: "Last name should contain minimum 3 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Last name can only contain upto 20 characters",
                  },
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: "Last name can only contain Alphabets",
                  },
                })}
                placeholder="Lastname"
              />
              {errors.lastname && (
                <p className="text-base ms-1 text-red-400">
                  {errors.lastname.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-between gap-7 max-sm:flex-col max-sm:gap-5">
            <div className="input flex flex-col w-1/2 max-sm:w-full">
              <label htmlFor="city">City:</label>
              <input
                type="text"
                className="mt-2 outline-none px-2 h-11 rounded-lg border-2 border-zinc-200 bg-violet-50 text-slate-500 text-base font-normal focus:bg-white"
                defaultValue={userData ? userData.city : ""}
                {...register("city", {
                  required: {
                    value: true,
                    message: "City is required",
                  },
                  minLength: {
                    value: 3,
                    message: "City should contain minimum 3 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "City can only contain upto 20 characters",
                  },
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: "City can only contain Alphabets",
                  },
                })}
                placeholder="City"
              />
            </div>
            <div className="input flex flex-col w-1/2 max-sm:w-full">
              <label htmlFor="state">State:</label>
              <input
                type="text"
                className="mt-2 outline-none px-2 h-11 rounded-lg border-2 border-zinc-200 bg-violet-50 text-slate-500 text-base font-normal focus:bg-white"
                defaultValue={userData ? userData.state : ""}
                {...register("state", {
                  required: {
                    value: true,
                    message: "State is required",
                  },
                  minLength: {
                    value: 3,
                    message: "State should contain minimum 3 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "State can only contain upto 20 characters",
                  },
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: "State can only contain Alphabets",
                  },
                })}
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
                {...register("country", {
                  required: {
                    value: true,
                    message: "Country is required",
                  },
                  minLength: {
                    value: 3,
                    message: "Country should contain minimum 3 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Country can only contain upto 20 characters",
                  },
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: "Country can only contain Alphabets",
                  },
                })}
                placeholder="country"
              />
            </div>
            <div className="input flex flex-col w-1/2 max-sm:w-full">
              <label htmlFor="dob">Date Of Birth:</label>
              <input
                type="date"
                className="mt-2 outline-none px-2 h-11 rounded-lg border-2 border-zinc-200 bg-violet-50 text-slate-500 text-base font-normal focus:bg-white"
                defaultValue={formatDate(userData?.dob)}
                {...register("dob", {
                  required: {
                    value: true,
                    message: "DOB is required",
                  },
                })}
                placeholder="dob"
              />
            </div>
          </div>
          <div className="flex justify-between gap-7 max-sm:flex-col max-sm:gap-5">
            <div className="input flex flex-col w-1/2 max-sm:w-full">
              <label htmlFor="gender">Gender:</label>
              <select
                className="mt-2 outline-none px-2 h-11 rounded-lg border-2 border-zinc-200 bg-violet-50 text-slate-500 text-base font-normal focus:bg-white"
                {...register("gender", {
                  required: {
                    value: true,
                    message: "Gender is required",
                  },
                })}
                defaultValue={userData?.gender || "choose"} // Set default value from user data
                id="gender"
              >
                <option value="choose">Choose Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="input flex flex-col w-1/2 max-sm:w-full">
              <label htmlFor="age">Age:</label>
              <input
                type="number"
                className="mt-2 outline-none px-2 h-11 rounded-lg border-2 border-zinc-200 bg-violet-50 text-slate-500 text-base font-normal focus:bg-white"
                defaultValue={userData ? userData.age : 0}
                {...register("age", {
                  required: {
                    value: true,
                    message: "Age is required",
                  },
                })}
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
              {...register("address", {
                required: {
                  value: true,
                  message: "Address is required",
                },
              })}
              cols="30"
              rows="5"
            ></textarea>
          </div>
          <Button
            type="submit"
            variant="filled"
            className="flex items-center gap-2 w-fit bg-neutral-800 py-2 px-4 rounded-lg hover:bg-neutral-950 text-left text-white text-base"
          >
            <SystemUpdateAltOutlined className="!w-5" /> Save
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
