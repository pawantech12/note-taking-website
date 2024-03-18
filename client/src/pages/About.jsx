import React from "react";
import AboutImg from "../images/about.png";
import Team from "../images/team.jfif";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Divider from "../components/Divider";
const About = () => {
  return (
    <>
      <div className="about flex justify-around items-center h-screen max-md:flex-col-reverse">
        <div className="content w-[40%] max-md:w-11/12">
          <h1 className="text-6xl max-md:text-4xl font-bold leading-tight">
            About
          </h1>
          <p className="text-xl">
            We're passionate about empowering individuals and teams to capture
            ideas, organize thoughts, and boost productivity. Born from the
            frustration of limited note-taking options, NotePlus was designed to
            be the one-stop shop for all your note-taking needs.
          </p>
        </div>
        <div className="img w-[40%] max-md:w-10/12">
          <img src={AboutImg} alt="" />
        </div>
      </div>
      <div className="mt-9">
        <div className="text-center flex flex-col items-center gap-3">
          <h2 className="text-4xl font-bold">
            The Mind Behind NotePlus Web App
          </h2>
          <p className="text-xl w-[60%] max-md:w-11/12">
            Here at NotePlus, we believe great tools are built by passionate
            people. Meet the talented team dedicated to making your note-taking
            experience exceptional.
          </p>
        </div>
        <div className="flex justify-center mt-11">
          <div className="bg-white rounded-xl w-96 max-md:w-80 shadow-md overflow-hidden text-center flex flex-col gap-1 items-center py-4 px-5">
            <div className="profile w-fit">
              <img src={Team} className="w-28 rounded-full" />
            </div>
            <h3 className="text-2xl font-semibold">Pawan Kumavat</h3>
            <span className="text-slate-500">Developer & Owner</span>
            <hr className="border-t border-gray-300 my-4 border-[1px] w-11/12" />
            <p>
              Crafted the intuitive user interface that makes note-taking a
              breeze, Built the robust backend that ensures your notes are
              always secure, Masterminded the rich text editing features that
              let you express your ideas in style
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
