import { createSlice } from "@reduxjs/toolkit";
import { getCurrentWeather } from "./ActionCreater";
import { IWeather } from "../../../interfaces/IWeather";

export interface WeatherState {
  weather: IWeather | null;
  loading: boolean;
  error: string;
}
const initialState: WeatherState = {
  weather: null,
  loading: false,
  error: "",
};

export const WeatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCurrentWeather.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.weather = action.payload;
    });
    builder.addCase(getCurrentWeather.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getCurrentWeather.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const weatherReducer = WeatherSlice.reducer;
