import { useState } from "react";
import { useNavigate } from "react-router-dom";

import JoyButton from "@mui/joy/Button";
import { Button } from "@mui/material";
import { motion } from "framer-motion";

const Buttons = ({ deleteHandle, favorite, getForecast, getCityKey }) => {
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();

  function alertPopUp() {
    setAlert(true);
  }
  return (
    <>
      <div className="flex flex-col gap-1 2xl:gap-2">
        <Button
          size="small"
          className="capitalize 2xl:w-44"
          id="favoriteBtns"
          color="error"
          onClick={() => alertPopUp()}
        >
          Delete
        </Button>
        <JoyButton
          size="md"
          variant="soft"
          className="capitalize 2xl:w-44"
          id="favoriteBtns"
          color="primary"
          onClick={() => {
            getForecast(favorite.id);
            getCityKey(favorite.cityName);
            navigate("/");
          }}
        >
          full weather
        </JoyButton>
      </div>
      {alert && (
        <>
          <motion.div
            className="w-screen h-full bg-black opacity-20 fixed left-0 top-0 bottom-0 right-0 z-50"
            animate={{ opacity: [0, 0.2] }}
            transition={{ duration: 0.7, ease: "easeIn" }}
          ></motion.div>
          <motion.div
            className=" bg-stone-50 rounded-xl py-7 px-20 fixed flex flex-col justify-center top-2/4 left-1/2 -translate-y-2/4 -translate-x-2/4 z-50"
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <p className="text-center p-2 capitalize lg:text-xl 2xl:text-3xl">{`are you sure to delete ${favorite.cityName}?`}</p>

            <div className="flex gap-8 2xl:gap-20 py-2 2xl:py-6 justify-center">
              <JoyButton
                color="success"
                onClick={() => deleteHandle(favorite.cityName)}
                size="md"
                variant="soft"
                className="capitalize 2xl:w-24"
                id="deleteBtns"
              >
                yes
              </JoyButton>
              <JoyButton
                color="danger"
                onClick={() => setAlert(false)}
                size="md"
                variant="soft"
                className="capitalize 2xl:w-24"
                id="deleteBtns"
              >
                no
              </JoyButton>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
};

export default Buttons;
