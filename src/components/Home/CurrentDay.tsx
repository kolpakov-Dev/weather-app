import Temp from "./../../assets/img/icons/temp.svg";
import Pressure from "./../../assets/img/icons/pressure.svg";
import Precipitation from "./../../assets/img/icons/precipitation.svg";
import Wind from "./../../assets/img/icons/wind.svg";
import Bg from "./../../assets/img/bg.png";
import { useAppSelector } from "../../hooks/redux";
import { converFullDateToTime } from "../../models/Weather";
import Sun from "./../../assets/img/weather-types/small_rain_sun.svg";
export const CurrentDay = () => {
  const { weather } = useAppSelector((state) => state.weatherReducer);

  return (
    <div className="CurrentDay mainBlock">
      <div className="left">
        <div className="left_body">
          <div className="left_body_text">
            <h2 className="temperature">{weather?.temperature}°</h2>
            <span className="day">Today</span>
          </div>
          <img src={Sun} alt="weather" className="weather_type_img" />
        </div>
        <p>{converFullDateToTime(weather!.date)}</p>
        <p>{weather?.location}</p>
      </div>
      <div className="right">
        <img src={Bg} alt="bg" />
        <div className="indicators_list">
          <div className="indicator_item">
            <div className="indicator_item_icon">
              <div className="icon">
                <img src={Temp} alt="icon" />
              </div>
              <span>Temperature</span>
            </div>
            <p>
              {weather?.temperature}° - feels like {weather?.feelslike}°
            </p>
          </div>
          <div className="indicator_item">
            <div className="indicator_item_icon">
              <div className="icon">
                <img src={Pressure} alt="icon" />
              </div>
              <span>Pressure</span>
            </div>
            <p>{weather?.pressure}</p>
          </div>
          <div className="indicator_item">
            <div className="indicator_item_icon">
              <div className="icon">
                <img src={Precipitation} alt="icon" />
              </div>
              <span>Precipitation</span>
            </div>
            <p>{weather?.precipitation} mm</p>
          </div>
          <div className="indicator_item">
            <div className="indicator_item_icon">
              <div className="icon">
                <img src={Wind} alt="icon" />
              </div>
              <span>Wind</span>
            </div>
            <p>{weather?.wind}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
