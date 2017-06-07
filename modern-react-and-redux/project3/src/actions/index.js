import axios from 'axios';
export const FETCH_WEATHER = 'FETCH_WEATHER';

const API_KEY = '89494aac357a0273545a124ffbef0ec1';
const BaseURL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`

export function fetchWeather(city) {
  const url = `${BaseURL}&q=${city},us`;
  const response = axios.get(url);

  return {
    type: FETCH_WEATHER,
    payload: response
  }
}
