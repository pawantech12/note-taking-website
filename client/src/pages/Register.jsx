import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  // const delay = (d) => {
  //   return new Promise((res) => setTimeout(res, d * 1000));
  // };
  const [msg, setMsg] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const onSubmit = async (data) => {
    // await delay(2); // simulate server latency
    console.log("before sending data to backend", data);

    // sending data to backend using fetch api
    try {
      let response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      let resdata = await response.json();
      if (!response.ok) {
        console.log("error occured");
      }
      console.log(`Success! You are registered.`);
      console.log("After sending data to backend", resdata);
      setMsg(resdata.msg);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
      setShowMessage(true);
      reset();
    } catch (error) {
      console.log(`Error! ${error}`);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen my-5">
      <div className="w-1/2 shadow-[0_0px_40px_rgb(0,0,0,5%)] p-5 rounded-lg bg-white max-sm:w-3/4 max-[431px]:w-11/12">
        <div className="w-full flex justify-center items-center gap-3">
          <img
            src="https://templates.iqonic.design/note-plus/html/assets/images/logo.png"
            alt="NotePlus Logo Image"
            className="w-1/12"
          />
          <span className="font-medium text-2xl">NotePlus</span>
        </div>
        <div className="flex flex-col items-center gap-4 my-6">
          <h1 className="font-semibold text-2xl">Sign Up</h1>
          <p className="font-medium text-base text-slate-400 text-center">
            Create your account to use the features of NotePlus web app.
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
            <div className="name-input flex justify-between gap-7 max-lg:flex-col max-lg:gap-5">
              <div className="input flex flex-col w-1/2 max-lg:w-full">
                <input
                  type="text"
                  className="outline-none px-2 h-11 rounded-lg border-2 border-zinc-200 bg-violet-50 text-slate-500 text-base font-normal focus:bg-white"
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
              <div className="input flex flex-col w-1/2 max-lg:w-full">
                <input
                  type="text"
                  className="outline-none px-2 h-11 rounded-lg border-2 border-zinc-200 bg-violet-50 text-slate-500 text-base font-normal focus:bg-white"
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
            <div className="password-input flex justify-between gap-7 max-lg:flex-col max-lg:gap-5">
              <div className="input flex flex-col w-1/2 max-lg:w-full">
                <input
                  type="password"
                  className="outline-none px-2 h-11 rounded-lg border-2 border-zinc-200 bg-violet-50 text-slate-500 text-base font-normal focus:bg-white"
                  {...register("password", {
                    required: { value: true, message: "password is required" },
                    minLength: {
                      value: 8,
                      message: "Password must be atleast 8 Characters",
                    },
                    maxLength: {
                      value: 15,
                      message: "Password cannot be exceed 15 characters",
                    },
                    validate: (value) => {
                      if (!/[a-zA-Z]/.test(value) || !/\d/.test(value)) {
                        return "Password must contain a combination of alphabets and numbers";
                      }
                      return true;
                    },
                  })}
                  placeholder="Password"
                />
                {errors.password && (
                  <p className="text-base ms-1 text-red-400">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="input flex flex-col w-1/2 max-lg:w-full">
                <input
                  type="password"
                  className="outline-none px-2 h-11 rounded-lg border-2 border-zinc-200 bg-violet-50 text-slate-500 text-base font-normal focus:bg-white"
                  {...register("cpassword", {
                    required: {
                      value: true,
                      message: "Confirm password is required",
                    },
                    validate: (value) => {
                      if (watch("password") != value) {
                        return "Your passwords do no match";
                      }
                    },
                  })}
                  placeholder="Confirm Password"
                />
                {errors.cpassword && (
                  <p className="text-base ms-1 text-red-400">
                    {errors.cpassword.message}
                  </p>
                )}
              </div>
            </div>
            <div className="agree-terms flex flex-col gap-1">
              <div className="checkbox flex gap-2 items-center">
                <input
                  type="checkbox"
                  id="agreecheck"
                  {...register("agreecheck", {
                    required: {
                      value: true,
                      message: "Please Agree to term of use to proceed",
                    },
                  })}
                />
                <label
                  htmlFor="agreecheck"
                  className=" font-medium text-slate-400"
                >
                  I agree with the term of use.
                </label>
              </div>
              {errors.agreecheck && (
                <p className="text-base ms-1 text-red-400">
                  {errors.agreecheck.message}
                </p>
              )}
            </div>
            <div className="w-full btn text-center">
              <input
                disabled={isSubmitting}
                value="Sign  Up"
                type="submit"
                className="w-fit bg-neutral-800 py-2 px-6 rounded-lg hover:bg-neutral-950 text-white text-lg cursor-pointer"
              />
            </div>
            <p className="text-gray-400 text-center font-medium">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-neutral-800 hover:text-neutral-950 font-medium"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
