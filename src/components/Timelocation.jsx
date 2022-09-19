import React from 'react';
import { formatLocalTime } from '../services/WeatherServices';

function Timelocation({ weather: { dt, timezone, name, country } }) {
  return (
    <div>
      <div className="flex items-center justify-center my-6">
        <p className="text-xl text-white font-extralight">
          {formatLocalTime(dt, timezone)}
        </p>
      </div>
      <div className="flex items-center justify-center my-3">
        <p className="text-3xl text-white font-medium">
          {`${name}, ${country}`}
        </p>
      </div>
    </div>
  );
}

export default Timelocation;
