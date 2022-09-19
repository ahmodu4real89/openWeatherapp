import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Forcast from './components/Forcast.jsx';
import Search from './components/Search.jsx';
import Tempreture from './components/Tempreture.jsx';
import Timelocation from './components/Timelocation.jsx';
import Topmenu from './components/Topmenu.jsx';
import getFormatedWeatherData from './services/WeatherServices.js';

function App() {
  const [query, setQuery] = useState({ q: 'Lagos' });
  const [units, setUnit] = useState('metric');
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : 'current location';
      toast.info('Fetching weather for ' + message);
      await getFormatedWeatherData({ ...query, units }).then((data) => {
        toast.success(
          `Successfull fetch weather for ${data.name}, ${data.country}.`
        );
        setWeather(data);
      });
    };

    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return `from-cyan-700 to-blue-700`;
    let threshod = units === 'metric' ? 20 : 60;
    if (weather.temp <= threshod) return `from-cyan-700 to-blue-700`;
    return `from-yellow-700 to-orange-700`;
  };

  return (
    <div
      className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}
    >
      <Topmenu setQuery={setQuery} />
      <Search setQuery={setQuery} units={units} setUnit={setUnit} />

      {weather && (
        <div>
          <Timelocation weather={weather} />
          <Tempreture weather={weather} />
          <Forcast title="hourly forecast" items={weather.hourly} />
          <Forcast title="daily forecast" items={weather.daily} />
        </div>
      )}

      <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />
    </div>
  );
}

export default App;
