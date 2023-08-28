import { createAsyncThunk } from "@reduxjs/toolkit";
import { getWetherByCity } from "../../../models/Weather";
import { IFutureWeather, IWeather } from "../../../interfaces/IWeather";
export const getCurrentWeather = createAsyncThunk(
  "weather/getCurrentWeather",
  async (_: any, thunkApi) => {
    let weatherRes: IWeather = {
      date: "",
      location: "",
      temperature: "",
      conditionText: "",
      precipitation: "",
      wind: 0,
      pressure: 0,
      feelslike: "",
      nextDays: [],
    };
    try {
      const weather = await getWetherByCity(_.city);
      //console.log(JSON.stringify(weather));
      weatherRes.location = weather.data.location.name;
      weatherRes.date = weather.data.location.localtime;
      weatherRes.temperature = weather.data.current.temp_c;
      weatherRes.conditionText = weather.data.current.condition.text;
      weatherRes.precipitation = weather.data.current.precip_mm;
      weatherRes.feelslike = weather.data.current.feelslike_c;
      weatherRes.wind = weather.data.current.wind_kph;
      weatherRes.pressure = weather.data.current.pressure_in;
      weatherRes.nextDays = weather.data.forecast.forecastday.map(
        (elem: any) => {
          return {
            date: elem.date,
            temperatureMax: elem.day.maxtemp_c,
            temperatureMin: elem.day.mintemp_c,
            conditionText: elem.day.condition.text,
            conditionIcon: elem.day.condition.icon,
          } as IFutureWeather;
        }
      );
      return weatherRes;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
