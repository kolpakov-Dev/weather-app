import { IFutureWeather } from "../../interfaces/IWeather";
import { converFullDateToDate } from "../../models/Weather";
interface props {
  day: IFutureWeather;
}
export const WeatherDay = (props: props) => {
  return (
    <div className="weatherDay">
      <p className="day">{converFullDateToDate(props.day.date)}</p>
      <img src={props.day.conditionIcon} alt="weather" />
      <span className="temperature tempDay">{props.day.temperatureMax}°</span>
      <span className="temperature tempNight">{props.day.temperatureMin}°</span>
      <span className="weatherType">{props.day.conditionText}</span>
    </div>
  );
};
