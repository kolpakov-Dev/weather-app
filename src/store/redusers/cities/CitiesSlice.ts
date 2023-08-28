import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { addCity, fetchCities, removeCity } from "./ActionCreater";

interface CitiesState {
  cities: string[] | [];
  defaultCity: string;
  loading: boolean;
  error: string;
}
const initialState: CitiesState = {
  cities: [],
  defaultCity: "",
  loading: false,
  error: "",
};

export const CitiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    cleanCitiesArr: (state) => {
      state.cities = [];
    },
    setDefaultCity: (state, action: PayloadAction<string>) => {
      state.defaultCity = action.payload;
    },
    cleanError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addCity.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.cities.push(action.payload as string as never);
    });
    builder.addCase(addCity.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(addCity.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(removeCity.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.cities = state.cities.filter((elem) => {
        return elem !== action.payload;
      });
    });
    builder.addCase(removeCity.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(removeCity.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(fetchCities.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.cities = action.payload;
    });
    builder.addCase(fetchCities.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchCities.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const citiesReducer = CitiesSlice.reducer;
