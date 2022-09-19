import { DateTime } from 'luxon';

const API_KEY = 'd64d64674c713bcece270b056743810b';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + '/' + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
  return fetch(url).then((res) => res.json());
};

const formartCurrentData = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;
  const { main: details, icon } = weather[0];

  return {
    lon,
    lat,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
  };
};

const formatForecastWeather = (data) => {
  let { timezone, daily, hourly } = data;
  daily = daily.slice(1, 6).map((d) => {
    return {
      title: formatLocalTime(d.dt, timezone, 'ccc'),
      temp: d.temp.day,
      icon: d.weather[0].icon,
    };
  });

  hourly = hourly.slice(1, 6).map((d) => {
    return {
      title: formatLocalTime(d.dt, timezone, 'hh:mm a'),
      temp: d.temp,
      icon: d.weather[0].icon,
    };
  });

  return { timezone, daily, hourly };
};

const getFormatedWeatherData = async (searchParams) => {
  const formattedCurrentData = await getWeatherData(
    'weather',
    searchParams
  ).then(formartCurrentData);

  const { lat, lon } = formattedCurrentData;

  const formattedForecastWeather = await getWeatherData('onecall', {
    lat,
    lon,
    exclude: 'current, minutely, alerts',
    units: searchParams.units,
  }).then(formatForecastWeather);

  return { ...formattedCurrentData, ...formattedForecastWeather };
};

const formatLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrl = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormatedWeatherData;
export { formatLocalTime, iconUrl };
