import { useState } from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

import axios from "axios";
import SearchBox from "./SearchBox";

import { useSelector } from "react-redux";
import ErrorsAlert from "./ErrorsAlert";

const Home = ({
  getFavorites,
  saveFavorites,
  getForecast,
  getCityKey,
  isFavoriteExsist,
  setIsFavoriteExsist,
}) => {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");

  let { curWeather, fiveDaysForecast, loading, error, cityLocation } =
    useSelector((state) => state.data);

  const handelLocalStorage = () => {
    if (isFavoriteExsist) {
      const newArr = getFavorites();
      const indexToRemove = newArr.findIndex(
        (f) => f.cityName === cityLocation.LocalizedName
      );
      newArr.splice(indexToRemove, 1);
      saveFavorites(newArr);

      setIsFavoriteExsist(false);
    } else {
      const newArr = getFavorites();
      newArr.push({
        id: cityLocation.Key,
        cityName: cityLocation.LocalizedName,
        curWeather,
      });
      saveFavorites(newArr);

      setIsFavoriteExsist(true);
    }
  };

  const removeDuplicate = (arr) => {
    const result = arr.reduce((unique, o) => {
      if (!unique.some((obj) => obj.label === o.label)) {
        unique.push(o);
      }
      return unique;
    }, []);
    return result;
  };

  const loadOptions = async (inputValue) => {
    try {
      const response = await axios.get(
        `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${
          import.meta.env.VITE_API_KEY
        }&q=${inputValue}`
      );
      const options = response?.data?.map((city) => {
        return {
          label: `${city.LocalizedName}`,
          id: `${city.Key}`,
        };
      });
      return removeDuplicate(options);
    } catch (e) {
      error = e.message;
    }
  };

  const getOptions = async () => {
    const res = await loadOptions(inputValue);
    setOptions(res);
  };

  return (
    <>
      <SearchBox
        options={options}
        value={value}
        setValue={setValue}
        getForecast={getForecast}
        getCityKey={getCityKey}
        inputValue={inputValue}
        setInputValue={setInputValue}
        getOptions={getOptions}
      />

      {error && <ErrorsAlert errorMessage={error} />}

      {cityLocation.LocalizedName && !error && (
        <section className="bg-stone-50/30 py-6 px-4 my-9 mx-auto rounded-lg shadow-inner w-full xl:w-4/5 2xl:max-w-screen-2xl">
          <div className="flex justify-between md:px-8 p-3">
            <div className="flex gap-4 2xl:gap-8">
              <h4 className="font-bold text-3xl 2xl:text-6xl text-center tracking-wider">
                {cityLocation?.LocalizedName}
              </h4>
              <div className="flex items-center text-lg 2xl:text-3xl">
                <span>{curWeather?.Temperature.Metric.Value} </span>
                <img
                  className="inline w-9 2xl:w-14 max-w-4xl -mx-2 -mt-1"
                  src="../../assets/icons/icon-c.svg"
                  alt="degrees icon"
                />
              </div>
            </div>
            <button onClick={handelLocalStorage}>
              {isFavoriteExsist ? (
                <MdFavorite className="text-pink-600 text-3xl 2xl:text-5xl" />
              ) : (
                <MdFavoriteBorder className="text-pink-600 text-3xl 2xl:text-5xl" />
              )}
            </button>
          </div>

          <div className="flex justify-center py-10 2xl:my-5 relative">
            <img
              className="absolute top-3 2xl:top-1 w-28 md:w-24 2xl:w-36 opacity-60 z-0"
              src={`../../assets/icons/icon-${curWeather?.WeatherIcon}.png`}
              alt="Weather Icon"
            />
            <p className="text-3xl 2xl:text-5xl font-extralight relative">
              {curWeather?.WeatherText}
            </p>
          </div>

          <div className="flex justify-start xl:justify-center items-center p-3 gap-4 2xl:gap-14 overflow-scroll">
            {fiveDaysForecast.DailyForecasts?.map((d, i) => (
              <div
                key={i}
                className="flex flex-col gap-4 w-48 2xl:gap-6 items-center min-w-fit py-3 2xl:py-6 px-8 2xl:w-52 bg-stone-50/75 rounded-xl"
              >
                <p className="text-md md:text-lg xl:text-xl 2xl:text-3xl">
                  {new Date(d.Date).toLocaleString("en-US", {
                    weekday: "long",
                  })}
                </p>
                <div className="py-2">
                  <img
                    className="w-16 2xl:w-32"
                    src={`../../assets/icons/icon-${d.Day.Icon}.png`}
                    alt="Weather Icon"
                  />
                </div>

                <div className="flex items-start gap-1">
                  <span className="text-sm md:text-md lg:text-lg 2xl:text-2xl">
                    {d.Temperature.Maximum.Value}
                    <img
                      className="inline w-5 2xl:w-12 max-w-4xl -mx-1 -mt-2"
                      src="../../assets/icons/icon-c.svg"
                      alt="degrees icon"
                    />
                  </span>
                  <span className="text-md font-extralight text-gray-600 -ml-1 -mt-1">
                    /
                  </span>
                  <span className="text-sm lg:text-md 2xl:text-xl font-light text-gray-600 mt-1">
                    {d.Temperature.Minimum.Value}
                    <img
                      className="inline w-4 2xl:w-10 max-w-4xl -mx-1 -mt-2 opacity-50"
                      src="../../assets/icons/icon-c.svg"
                      alt="degrees icon"
                    />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default Home;
