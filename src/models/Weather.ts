import axios from "axios";

export const getWetherByCity = (city: string) => {
  const getWeatherProm = axios
    .get(
      `http://api.weatherapi.com/v1/forecast.json?key=de4d61863db24004895193135232208&q=${city}&days=7&aqi=no&alerts=no`
    )
    .then(async (response) => {
      return response;
    });
  return getWeatherProm;
};
export const converFullDateToDate = (date: string) => {
  const ndate = date.replace(" ", "-");
  const arr = ndate.split("-");
  return `${arr[2]}.${arr[1]}`;
};
export const converFullDateToTime = (date: string) => {
  const ndate = date.replace(" ", "-");
  const arr = ndate.split("-");
  return `${arr[3]}`;
};
export const convertWeatherError = (error: string) => {
  switch (error) {
    case "ERR_BAD_REQUEST":
      return "There is a mistake in the name of the city or the weather in this city is not available";
    default:
      return error;
  }
};
