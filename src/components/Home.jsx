import { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

import axios from "axios";
import SearchBox from "./SearchBox";

import { useSelector } from "react-redux";

const Home = ({ getFavorites, saveFavorites, getForecast, getCityKey }) => {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");

  const cityLocation = useSelector((state) => state.data.cityLocation);

  const { curWeather, fiveDaysForecast, loading, error } = useSelector(
    (state) => state.data
  );

  const saveToLocalStorage = () => {
    const newArr = getFavorites();
    const valueExists = newArr?.some(
      (f) => f.cityName === cityLocation.LocalizedName
    );

    if (!valueExists) {
      newArr.push({
        cityName: cityLocation.LocalizedName,
        curWeather,
      });

      saveFavorites(newArr);
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

  // טוען את האופציות לבחירה
  const loadOptions = async (inputValue) => {
    console.log("Loading");
    try {
      const response = await axios.get(
        `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${
          import.meta.env.VITE_API_KEY
        }&q=${inputValue}`
      );
      const options = response?.data?.map((city, i) => {
        return {
          label: `${city.LocalizedName}`,
          id: `${city.Key}`,
        };
      });
      return removeDuplicate(options);
      // return options;
    } catch (e) {
      console.log(e);
    }
  };

  const getOptions = async () => {
    console.log("getOptions");

    const res = await loadOptions(inputValue);
    setOptions(res);
  };

  console.log(cityLocation);

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

      {!loading && (
        <section className="home__weather bg-slate-50 py-4 px-8 border-2">
          <div className="flex justify-between items-center">
            <div className="border-4 flex flex-col w-max p-2">
              <h4>{cityLocation?.LocalizedName}</h4>
              <div>
                <span>{curWeather?.Temperature.Metric.Value} </span>
                <span>{curWeather?.Temperature.Metric.Unit}</span>
              </div>
            </div>
            <div>
              <button onClick={saveToLocalStorage}>
                {/* <FavoriteBorderIcon /> */}
                <MdFavorite className="text-pink-600 text-3xl" />
                <MdFavoriteBorder className="text-pink-600 text-3xl" />
              </button>
            </div>
          </div>

          <div className="flex justify-center py-4">
            <p>{curWeather?.WeatherText}</p>
          </div>

          <div className="flex justify-center items-center p-2 gap-6">
            {fiveDaysForecast.DailyForecasts?.map((d, i) => (
              <div
                key={i}
                className="flex flex-col items-center border-2 px-2 py-5"
              >
                <p>
                  {new Date(d.Date).toLocaleString("en-US", {
                    weekday: "long",
                  })}
                </p>
                <div>
                  <p>
                    {d.Temperature.Minimum.Value} -{" "}
                    {d.Temperature.Maximum.Value}
                  </p>
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
