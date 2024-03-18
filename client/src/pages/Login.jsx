import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "../stores/auth";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  // const delay = (d) => {
  //   return new Promise((res) => setTimeout(res, d * 1000));
  // };
  const [msg, setMsg] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const { storeTokenInLS } = useAuth();

  const onSubmit = async (data) => {
    // await delay(2); // simulate server latency
    console.log("before sending data to backend", data);

    // sending data to backend using fetch api
    try {
      let response = await fetch(
        `https://note-taking-website.onrender.com/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
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
        console.log(`Success! You are Login.`);
        console.log("After sending data to backend", resdata);
        storeTokenInLS(resdata.token);
        setMsg(resdata.msg);
        setTimeout(() => {
          setShowMessage(false);
          navigate("/dashboard/your-notes");
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
          <h1 className="font-semibold text-2xl">Sign In</h1>
          <p className="font-medium text-base text-slate-400 text-center">
            Login to stay connected.
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
            className="flex flex-col gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="email-input">
              <input
                type="email"
                className="w-full outline-none px-2 h-11 rounded-lg border-2 border-zinc-200 bg-violet-50 text-slate-500 text-base font-normal focus:bg-white"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid Email address",
                  },
                })}
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-base ms-1 text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="password-input">
              <input
                type="password"
                className="w-full outline-none px-2 h-11 rounded-lg border-2 border-zinc-200 bg-violet-50 text-slate-500 text-base font-normal focus:bg-white"
                {...register("password")}
                placeholder="Password"
              />
            </div>
            <div className="agree-terms flex gap-2 items-center">
              <input type="checkbox" name="rememberme" id="rememberme" />
              <label htmlFor="rememberme" className="text-slate-400">
                Remember Me
              </label>
              <Link
                to="/forgot-pass"
                className="ml-auto float-left text-neutral-800 hover:text-neutral-950"
              >
                Forgot Password ?
              </Link>
            </div>
            <div className="w-full btn text-center">
              <input
                value="Sign  In"
                type="submit"
                className="w-fit bg-neutral-800 py-2 px-6 rounded-lg hover:bg-neutral-950 text-white text-lg cursor-pointer"
              />
            </div>
            <p className="text-gray-400 text-center font-medium">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-neutral-800 hover:text-neutral-950 font-medium"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
