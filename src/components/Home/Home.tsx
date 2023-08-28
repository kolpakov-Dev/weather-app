import React, { useState } from "react";
import { CurrentDay } from "./CurrentDay";
import WatherCalendar from "./WatherCalendar";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import Gif from "./../../assets/img/gf.gif";
import { getCurrentWeather } from "../../store/redusers/weather/ActionCreater";

const Home = () => {
  const { weather, loading, error } = useAppSelector(
    (state) => state.weatherReducer
  );
  const user = useAppSelector((state) => state.userReducer.user);
  const cities = useAppSelector((state) => state.citiesReducer.cities);
  const dispatch = useAppDispatch();
  const [showCities, changeShowCities] = useState(false);
  return (
    <>
      {loading ? <div className="loading"> Loading</div> : <></>}
      {error ? <div className="error"> {error}</div> : <></>}
      {weather ? (
        <>
          <CurrentDay />
          <WatherCalendar />
        </>
      ) : (
        <div className="MessageBlock">
          <p>
            {!user
              ? "Enter the name of the city or save the desired city in your personal account. "
              : "Enter the name of the city or select from saved. "}
          </p>
          <img src={Gif} alt="weather" />
        </div>
      )}
      {user && cities.length ? (
        <div className="cities cities_desc">
          {cities.map((elem) => {
            return (
              <div
                className="cityItem"
                onClick={() => dispatch(getCurrentWeather({ city: elem }))}
              >
                {elem}
              </div>
            );
          })}
        </div>
      ) : (
        <></>
      )}
      {user && cities.length ? (
        <div
          className={
            showCities ? "cities cities_mobile active" : "cities cities_mobile"
          }
        >
          <div
            className="citiesIcon"
            onClick={() => changeShowCities(!showCities)}
          >
            Cities
          </div>
          <div className={showCities ? "cityList show" : "cityList"}>
            {cities.map((elem) => {
              return (
                <div
                  className="cityItem"
                  onClick={() => dispatch(getCurrentWeather({ city: elem }))}
                >
                  {elem}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Home;
