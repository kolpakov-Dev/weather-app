import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./redusers/user/UserSlice";
import { weatherReducer } from "./redusers/weather/weatherSlice";
import { citiesReducer } from "./redusers/cities/CitiesSlice";

const rootReducer = combineReducers({
  userReducer,
  weatherReducer,
  citiesReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: true,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
