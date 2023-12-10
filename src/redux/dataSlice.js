import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://dataservice.accuweather.com";

export const cityLocationFetch = createAsyncThunk(
  "data/fetchData",
  async (city = "Tel Aviv") => {
    const response = await axios.get(
      `${BASE_URL}/locations/v1/cities/autocomplete?apikey=${
        import.meta.env.VITE_API_KEY
      }&q=${city}`
    );

    return response.data[0];
  }
);

export const currentWeatherFetch = createAsyncThunk(
  "data/fetchData2",
  async (key = 215854) => {
    const response = await axios.get(
      `${BASE_URL}/currentconditions/v1/${key}?apikey=${
        import.meta.env.VITE_API_KEY
      }`
    );

    return response.data[0];
  }
);

export const fiveDaysForecastFetch = createAsyncThunk(
  "data/fetchData3",
  async (key = 215854) => {
    const response = await axios.get(
      `${BASE_URL}/forecasts/v1/daily/5day/${key}?apikey=${
        import.meta.env.VITE_API_KEY
      }&metric=true`
    );

    return response.data;
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState: {
    cityLocation: [],
    curWeather: null,
    fiveDaysForecast: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handle the pending state
    builder.addCase(cityLocationFetch.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(currentWeatherFetch.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fiveDaysForecastFetch.pending, (state) => {
      state.loading = true;
    });

    // Handle the fulfilled state
    builder.addCase(cityLocationFetch.fulfilled, (state, action) => {
      state.loading = false;
      state.cityLocation = action.payload;
    });
    builder.addCase(currentWeatherFetch.fulfilled, (state, action) => {
      state.loading = false;
      state.curWeather = action.payload;
    });
    builder.addCase(fiveDaysForecastFetch.fulfilled, (state, action) => {
      state.loading = false;
      state.fiveDaysForecast = action.payload;
    });

    // Handle the rejected state
    builder.addCase(cityLocationFetch.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(currentWeatherFetch.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(fiveDaysForecastFetch.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default dataSlice.reducer;
