import { Button } from "@material-tailwind/react";
import { Add } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";

const ButtonComponent = ({ text }) => {
  return (
    <Button
      variant="filled"
      className="w-full bg-neutral-800 py-2 px-4 rounded-lg hover:bg-neutral-950 text-left text-white text-base"
    >
      <Link to={"/dashboard/create-note"}>
        <Add className="!w-5 me-2 !fill-white" /> {text}
      </Link>
    </Button>
  );
};

export default ButtonComponent;
