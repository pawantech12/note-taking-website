import {
  FastRewindOutlined,
  SystemUpdateAltOutlined,
} from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useAuth } from "../stores/auth";
import { useState } from "react";
const CreateNote = () => {
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
  const { token } = useAuth();
  const [msg, setMsg] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const onSubmit = async (data) => {
    // await delay(2); // simulate server latency
    console.log("before sending Note data to backend", data);

    // sending data to backend using fetch api
    try {
      let response = await fetch(
        `https://note-taking-website.onrender.com/api/notes`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: token },
          body: JSON.stringify(data),
        }
      );
      let resdata = await response.json();
      if (!response.ok) {
        console.log("error occured");
      }
      console.log(`Success! You have created Note.`);
      console.log("After sending Note data to backend", resdata);
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
    <div className="notes-container bg-white m-6 px-7 py-6 rounded-lg shadow-[0_0px_40px_rgb(0,0,0,0.05)]">
      <div className="container-header flex justify-between items-center mb-3">
        <h2 className="text-2xl">Create Note</h2>
      </div>
      {showMessage && (
        <p className="bg-neutral-600 text-white text-center py-2 rounded-md mb-4">
          {msg}
        </p>
      )}
      <div className="form">
        <form
          action=""
          className="flex flex-col gap-6 mt-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="input flex flex-col gap-1">
            <label htmlFor="title" className="text-lg">
              Title
            </label>
            <input
              type="text"
              className="outline-none px-2 h-11 rounded-lg border border-zinc-200 bg-violet-50 text-slate-500 text-base font-normal focus:bg-white"
              {...register("title", {
                required: {
                  value: true,
                  message: "Title is required",
                },
                minLength: {
                  value: 5,
                  message: "Title should contain minimum 5 characters",
                },
                maxLength: {
                  value: 50,
                  message: "Title can only contain upto 50 characters",
                },
                pattern: {
                  value: /^[A-Za-z0-9\s]+$/i,
                  message:
                    "Title can only contain letters, numbers, and spaces",
                },
              })}
              id="title"
              placeholder="Title"
            />
            {errors.title && (
              <p className="text-base ms-1 text-red-400">
                {errors.title.message}
              </p>
            )}
          </div>
          <div className="desccontainer flex flex-col gap-1">
            <label htmlFor="description" className="text-lg">
              Content
            </label>
            <textarea
              {...register("content", {
                required: "Note content is required",
                pattern: {
                  value: /^[\w\s.,!?-]*$/,
                  message:
                    "Invalid note content format. Only alphanumeric characters, spaces, commas, periods, exclamation marks, question marks, and hyphens are allowed.",
                },
              })}
              id="description"
              cols="30"
              rows="5"
              placeholder="Description"
              className="outline-none p-2 rounded-lg border border-zinc-200 bg-violet-50 text-slate-500 text-base font-normal focus:bg-white"
            ></textarea>
            {errors.content && (
              <p className="text-base ms-1 text-red-400">
                {errors.content.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="status" className="text-lg">
              Choose Status
            </label>
            <select
              className="block cursor-pointer appearance-none mt-2 w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              {...register("status")}
            >
              <option value="publish">Publish</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <div className="btn flex items-center gap-2">
            <button className="w-fit bg-white py-1 px-4 rounded-lg hover:bg-neutral-800 hover:text-white text-base flex items-center gap-2 border border-neutral-800">
              <FastRewindOutlined className="!w-5" /> Reset
            </button>
            <button className="w-fit bg-neutral-800 py-1 px-4 rounded-lg hover:bg-neutral-950 text-white text-base flex items-center gap-2">
              <SystemUpdateAltOutlined className="!w-5" /> Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNote;
