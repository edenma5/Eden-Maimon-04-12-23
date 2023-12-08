import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Favorites from "./components/Favorites";

import { useDispatch, useSelector } from "react-redux";
import {
  cityLocationFetch,
  currentWeatherFetch,
  fiveDaysForecastFetch,
} from "./redux/dataSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const cityLocation = useSelector((state) => state.data.cityLocation);

  const getFavoritesFromLS = () => {
    let favoritesData = JSON.parse(localStorage.getItem("favorites"));

    if (!favoritesData) {
      localStorage.setItem("favorites", JSON.stringify([]));
      favoritesData = [];
    }

    return favoritesData;
  };

  const saveFavoritesToLS = (data) => {
    data && localStorage.setItem("favorites", JSON.stringify(data));
  };

  useEffect(() => {
    console.log("getOnStartData");

    getOnStartData();
  }, []);

  console.log("a render");

  const getForecast = () => {
    console.log("getForecast");
    if (cityLocation?.Key) {
      dispatch(currentWeatherFetch(cityLocation?.Key));
      dispatch(fiveDaysForecastFetch(cityLocation?.Key));
    }
  };

  const getCityKey = (inputValue) => {
    console.log("getCityKey");
    dispatch(cityLocationFetch(inputValue));
  };

  const getOnStartData = () => {
    dispatch(cityLocationFetch());
    dispatch(currentWeatherFetch());
    dispatch(fiveDaysForecastFetch());
  };

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            index
            element={
              <Home
                getFavorites={getFavoritesFromLS}
                saveFavorites={saveFavoritesToLS}
                getForecast={getForecast}
                getCityKey={getCityKey}
              />
            }
          />
          <Route
            path="favorites"
            element={
              <Favorites
                getFavorites={getFavoritesFromLS}
                saveFavorites={saveFavoritesToLS}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
