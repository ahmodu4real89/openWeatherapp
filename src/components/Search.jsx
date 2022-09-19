import { useState } from 'react';
import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons';
import { toast } from 'react-toastify';

function Search({ setQuery, units, setUnit }) {
  const [city, setCity] = useState('');

  const handleUnitChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) setUnit(selectedUnit);
  };

  const handleSearch = () => {
    if (city !== '') setQuery({ q: city });
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      toast.info('Fetching weather location');
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success('Location fetched');
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat,
          lon,
        });
      });
    }
  };

  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input
          className="text-xl font-light p-2 w-full shadow-xl capitalize placeholder:lowercase focus:outline-none"
          type="text"
          placeholder="search...."
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
        />
        <UilSearch
          size={25}
          onClick={handleSearch}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
        />
        <UilLocationPoint
          size={25}
          onClick={handleLocationClick}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
        />
      </div>
      <div className="flex flex-row w-1/4 justify-center items-center">
        <button
          name="matric"
          onClick={handleUnitChange}
          className="text-xl text-white font-light transition ease-out hover:scale-125"
        >
          <sup>o</sup>C
        </button>
        <p className="text-xl text-white mx-1">|</p>
        <button
          name="imperial"
          onClick={handleUnitChange}
          className="text-xl text-white font-light transition ease-out hover:scale-125"
        >
          <sup>o</sup>F
        </button>
      </div>
    </div>
  );
}

export default Search;
