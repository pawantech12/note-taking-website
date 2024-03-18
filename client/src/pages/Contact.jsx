import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [msg, setMsg] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const onSubmit = async (data) => {
    // await delay(2); // simulate server latency
    console.log("before sending form data to backend", data);

    // sending data to backend using fetch api
    try {
      let response = await fetch(
        `https://note-taking-website.onrender.com/api/contact`,
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
        console.log(`Success! You have Sent Message to our team.`);
        console.log("After sending form data to backend", resdata);
        setMsg(resdata.message);
        setTimeout(() => {
          setShowMessage(false);
        }, 3000);
        setShowMessage(true);
        reset();
      }
    } catch (error) {
      console.log(`Error! ${error}`);
    }
  };
  return (
    <>
      <div className="contact flex flex-col items-center mt-10">
        <div className="text-center flex flex-col items-center gap-3">
          <h2 className="text-4xl font-bold">Get in Touch</h2>
          <p className="text-xl w-[60%] max-md:w-11/12">
            Have a question, need help, or want to chat about ideas? We'd love
            to hear from you! Reach out using the form below, send us an email.
          </p>
        </div>
        <div className="mt-10 bg-white py-8 px-10 rounded-lg w-[45%] max-lg:w-10/12 max-sm:w-11/12">
          {showMessage && (
            <p className="bg-neutral-600 text-white text-center py-2 px-3 rounded-md mb-4">
              {msg}
            </p>
          )}
          <form action="" onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="input flex justify-between gap-7 max-sm:gap-5 max-sm:flex-col">
              <div className="w-1/2 flex flex-col gap-2 max-sm:w-full">
                <label htmlFor="name" className="font-semibold text-lg">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Name is required",
                    },
                    minLength: {
                      value: 5,
                      message: "Name should contain minimum 5 characters",
                    },
                    maxLength: {
                      value: 20,
                      message: "Name can only contain upto 20 characters",
                    },
                    pattern: {
                      value: /^[A-Za-z\s]+$/i,
                      message: "Name can only contain Alphabets",
                    },
                  })}
                  className="outline-none px-2 h-11 rounded-lg border border-zinc-200 bg-violet-50 text-slate-500 text-base font-normal focus:bg-white"
                  placeholder="Your Name"
                />
                {errors.name && (
                  <p className="text-base ms-1 text-red-400">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="w-1/2 max-sm:w-full flex flex-col gap-2">
                <label htmlFor="email" className="font-semibold text-lg">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
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
                  className="outline-none px-2 h-11 rounded-lg border border-zinc-200 bg-violet-50 text-slate-500 text-base font-normal focus:bg-white"
                  placeholder="Your Email"
                />
                {errors.email && (
                  <p className="text-base ms-1 text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <div className="input flex max-sm:mt-6 justify-between gap-7 max-sm:gap-5 max-sm:flex-col">
              <div className="w-1/2 flex flex-col gap-2 max-sm:w-full">
                <label htmlFor="phone" className="font-semibold text-lg">
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  {...register("phone", {
                    required: {
                      value: true,
                      message: "Mobile is required",
                    },
                    minLength: {
                      value: 10,
                      message:
                        "Phone number must be at least 10 characters long",
                    },
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Mobile No. only Contains Number",
                    },
                  })}
                  className="outline-none px-2 h-11 rounded-lg border border-zinc-200 bg-violet-50 text-slate-500 text-base font-normal focus:bg-white"
                  placeholder="Your Mobile Number"
                />
                {errors.phone && (
                  <p className="text-base ms-1 text-red-400">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div className="w-1/2 flex flex-col gap-2 max-sm:w-full">
                <label htmlFor="subject" className="font-semibold text-lg">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  {...register("subject", {
                    required: {
                      value: true,
                      message: "Subject is required",
                    },
                    minLength: {
                      value: 5,
                      message: "Subject should contain minimum 5 characters",
                    },
                    pattern: {
                      value: /^[A-Za-z\s]+$/i,
                      message: "Subject can only contain Alphabets",
                    },
                  })}
                  className="outline-none px-2 h-11 rounded-lg border border-zinc-200 bg-violet-50 text-slate-500 text-base font-normal focus:bg-white"
                  placeholder="Your Subject"
                />
                {errors.subject && (
                  <p className="text-base ms-1 text-red-400">
                    {errors.subject.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1 max-sm:mt-6">
              <label htmlFor="message" className="font-semibold text-lg">
                Message
              </label>
              <textarea
                {...register("message", {
                  required: "Note content is required",
                  pattern: {
                    value: /^[\w\s.,!?-]*$/,
                    message:
                      "Invalid note content format. Only alphanumeric characters, spaces, commas, periods, exclamation marks, question marks, and hyphens are allowed.",
                  },
                })}
                id="message"
                cols="30"
                rows="5"
                placeholder="Enter Message"
                className="outline-none p-2 rounded-lg border border-zinc-200 bg-violet-50 text-slate-500 text-base font-normal focus:bg-white"
              ></textarea>
              {errors.content && (
                <p className="text-base ms-1 text-red-400">
                  {errors.content.message}
                </p>
              )}
            </div>
            <div className="w-full btn text-center mt-5">
              <input
                value="Send"
                type="submit"
                className="w-fit bg-neutral-800 py-2 px-6 rounded-md hover:bg-neutral-950 text-white text-lg cursor-pointer"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
