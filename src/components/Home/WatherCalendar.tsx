import React from "react";
import { WeatherDay } from "./WeatherDay";
import { useAppSelector } from "../../hooks/redux";

const WatherCalendar = () => {
  const { weather, loading, error } = useAppSelector(
    (state) => state.weatherReducer
  );
  return (
    <div className="calendar">
      {weather?.nextDays.map((elem) => {
        return <WeatherDay day={elem} key={elem.date} />;
      })}
    </div>
  );
};

export default WatherCalendar;
