import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import profileIcon from "./../assets/img/user.png";
import logo from "./../assets/img/logo.svg";
import { getCurrentWeather } from "../store/redusers/weather/ActionCreater";
import { useAppDispatch } from "../hooks/redux";
export const Header = () => {
  const [inputData, setInputData] = useState("");
  const dispatch = useAppDispatch();
  const showWeatherEvent = () => {
    if (!inputData) {
      return;
    }
    dispatch(getCurrentWeather({ city: inputData }));
  };
  return (
    <>
      <div className="header header_desc">
        <NavLink to="/">
          <img src={logo} alt="logo" />
          <p>Weather</p>
        </NavLink>
        <div className="inputGroup">
          <input
            type="text"
            placeholder="write a city"
            value={inputData}
            onChange={(event) => {
              setInputData(event.target.value);
            }}
          />
          <div className="inputBtn" onClick={() => showWeatherEvent()}>
            show weather
          </div>
        </div>
        <NavLink to="/profile">
          <img src={profileIcon} alt="Profile" />
        </NavLink>
      </div>
      <div className="header header_mobile">
        <NavLink to="/" className="logo">
          <img src={logo} alt="logo" />
          <p>Weather</p>
        </NavLink>
        <NavLink to="/profile">
          <img src={profileIcon} alt="Profile" />
        </NavLink>
        <div className="inputGroup">
          <input
            type="text"
            placeholder="write a city"
            value={inputData}
            onChange={(event) => {
              setInputData(event.target.value);
            }}
          />
          <div className="inputBtn" onClick={() => showWeatherEvent()}>
            show weather
          </div>
        </div>
      </div>
    </>
  );
};
