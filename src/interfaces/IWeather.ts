export interface IWeather {
  date: string;
  location: string;
  temperature: string;
  conditionText: string;
  precipitation: string;
  wind: number;
  pressure: number;
  feelslike: string;
  nextDays: IFutureWeather[];
}
export interface IFutureWeather {
  date: string;
  temperatureMax: number;
  temperatureMin: number;
  conditionText: string;
  conditionIcon: string;
}
