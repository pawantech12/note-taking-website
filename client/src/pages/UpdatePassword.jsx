import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
const UpdatePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [msg, setMsg] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const email = queryParams.get("email");

  const onSubmit = async (data) => {
    console.log(email);
    // await delay(2); // simulate server latency
    console.log("before sending data to backend", data.otp);

    // sending data to backend using fetch api
    try {
      let response = await fetch(
        `https://note-taking-website.onrender.com/api/auth/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newpassword: data.newpassword, email: email }),
        }
      );
      let resdata = await response.json();
      if (!response.ok) {
        console.log("error occured");
        setMsg(resdata.message);
        setTimeout(() => {
          setShowMessage(false);
        }, 3000);
        setShowMessage(true);
      } else {
        console.log(`Success! Password Updated.`);
        console.log("After sending data to backend", resdata);

        setMsg(resdata.message);
        setTimeout(() => {
          setShowMessage(false);
          navigate("/login");
        }, 3000);
        setShowMessage(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/3 shadow-[0_0px_40px_rgb(0,0,0,5%)] p-5 rounded-lg bg-white max-lg:w-1/2 max-sm:w-11/12">
        <div className="w-full flex justify-center items-center gap-3">
          <img
            src="https://templates.iqonic.design/note-plus/html/assets/images/logo.png"
            alt="NotePlus Logo Image"
            className="w-12"
          />
          <span className="font-medium text-2xl">NotePlus</span>
        </div>
        <div className="flex flex-col items-center gap-4 my-6">
          <h1 className="font-semibold text-2xl">Update Password</h1>
          <p className="font-medium text-base text-slate-400 text-center">
            Enter your New Password that you want to set.
          </p>
        </div>
        {showMessage && (
          <p className="bg-neutral-600 text-white text-center py-2 rounded-md mb-4">
            {msg}
          </p>
        )}
        <div className="form">
          <form
            action=""
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div className="email-input">
              <input
                type="password"
                {...register("newpassword", {
                  required: {
                    value: true,
                    message: "new password is required",
                  },
                  minLength: {
                    value: 8,
                    message: "Password must be atleast 8 Characters",
                  },
                  maxLength: {
                    value: 15,
                    message: "New Password cannot be exceed 15 characters",
                  },
                  validate: (value) => {
                    if (!/[a-zA-Z]/.test(value) || !/\d/.test(value)) {
                      return "New Password must contain a combination of alphabets and numbers";
                    }
                    return true;
                  },
                })}
                className="w-full outline-none px-2 h-11 rounded-lg border-2 border-zinc-200 bg-violet-50 text-slate-500 text-base font-normal focus:bg-white"
                placeholder="Enter New Password"
              />
              {errors.otp && (
                <p className="text-base ms-1 text-red-400">
                  {errors.otp.message}
                </p>
              )}
            </div>

            <div className="w-full btn text-center">
              <button
                type="submit"
                className="w-fit bg-neutral-800 py-2 px-6 rounded-lg hover:bg-neutral-950 text-white text-lg"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
