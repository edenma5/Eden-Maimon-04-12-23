import { CardActions } from "@mui/material";
import { motion } from "framer-motion";

import { useState } from "react";
import Buttons from "./Buttons";

const Favorites = ({
  getFavorites,
  saveFavorites,
  setIsFavoriteExsist,
  getForecast,
  getCityKey,
}) => {
  const [key, setKey] = useState(0);

  const deleteHandle = (cityName) => {
    const newArr = getFavorites();
    const indexToRemove = newArr.findIndex((f) => f.cityName === cityName);
    newArr.splice(indexToRemove, 1);

    saveFavorites(newArr);
    setKey((k) => ++k);
    setIsFavoriteExsist(false);
  };

  return (
    <>
      <motion.section
        key={key}
        className="bg-stone-50/30 py-10 px-4 my-8 mx-auto rounded-lg shadow-inner w-full xl:w-4/5 2xl:max-w-screen-2xl"
        animate={{ scale: [0, 1], opacity: [0, 1] }}
        transition={{ duration: 0.5, ease: "easeIn" }}
      >
        <motion.div
          className="mb-7"
          animate={{ y: [-500, 0], opacity: [0, 1] }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          <h2 className="text-center capitalize font-bold text-2xl 2xl:text-4xl tracking-wider">
            favorites
          </h2>
        </motion.div>

        <div className="flex items-start flex-wrap justify-start xl:justify-center gap-4 2xl:gap-11">
          {getFavorites()?.map((favorite, i) => {
            return (
              <motion.div
                key={i}
                className="flex flex-col items-center py-3 2xl:py-6 px-5 w-40 2xl:w-72 bg-stone-50/75 rounded-xl"
                animate={{ y: [1000, 0], opacity: [0, 1] }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              >
                <p className="text-md lg:text-lg 2xl:text-3xl">
                  {favorite.cityName}
                </p>
                <div className="pt-4 2xl:pt-6 w-full h-24 2xl:h-36">
                  <img
                    className="opacity-60 rounded-lg object-contain"
                    src={`${
                      favorite.curWeather.IsDayTime
                        ? "../../assets/images/day.png"
                        : "../../assets/images/night.png"
                    }`}
                    alt="Favorite Image"
                  />
                </div>

                <div className="flex justify-center min-w-full mt-1 lg:mt-3 2xl:mt-20 -mb-6 2xl:-mb-4 py-6 relative">
                  <motion.img
                    className="absolute top-1 2xl:-top-1 w-18 2xl:w-28 opacity-50 z-0"
                    animate={{ y: [-100, 0], opacity: [0, 1] }}
                    transition={{ duration: 0.9, delay: 0.4, ease: "easeIn" }}
                    src={`../../assets/icons/icon-${favorite.curWeather.WeatherIcon}.png`}
                    alt="Weather Icon"
                  />
                  <p className="text-md 2xl:text-2xl font-extralight relative">
                    {favorite.curWeather.WeatherText}
                  </p>
                </div>

                <div className="mt-4 mb-2">
                  <span className="text-md 2xl:text-2xl">
                    {favorite.curWeather.Temperature.Metric.Value}
                    <img
                      className="inline w-7 2xl:w-12 max-w-4xl -mx-2 2xl:-mx-3 -mt-2"
                      src="../../assets/icons/icon-c.svg"
                      alt="degrees icon"
                    />
                  </span>
                </div>

                <CardActions className="mt-auto">
                  <Buttons
                    favorite={favorite}
                    deleteHandle={deleteHandle}
                    getForecast={getForecast}
                    getCityKey={getCityKey}
                  />
                </CardActions>
              </motion.div>
            );
          })}
        </div>
      </motion.section>
    </>
  );
};

export default Favorites;
