import { useState, useEffect } from "react";

function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], "☀️"],
    [[1], "🌤"],
    [[2], "⛅️"],
    [[3], "☁️"],
    [[45, 48], "🌫"],
    [[51, 56, 61, 66, 80], "🌦"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
    [[71, 73, 75, 77, 85, 86], "🌨"],
    [[95], "🌩"],
    [[96, 99], "⛈"],
  ]);
  const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
  if (!arr) return "NOT FOUND";
  return icons.get(arr);
}

function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function formatDay(dateStr) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr));
}

async function getWeather(location) {
  try {
    // 1) Getting location (geocoding)
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
    );
    const geoData = await geoRes.json();
    console.log(geoData);

    if (!geoData.results) throw new Error("Location not found");

    const { latitude, longitude, timezone, name, country_code } =
      geoData.results.at(0);
    console.log(`${name} ${convertToFlag(country_code)}`);

    // 2) Getting actual weather
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
    );
    const weatherData = await weatherRes.json();
    console.log(weatherData.daily);
  } catch (err) {
    console.err(err);
  }
}

export default function App() {
  const [location, setLocation] = useState(function () {
    const storedValue = localStorage.getItem("location");
    return storedValue || "";
  });
  const [weather, setWeather] = useState({});
  const [displayName, setDisplayName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  console.log(weather);

  function handleChangeLocation(newLocation) {
    setLocation(newLocation);

    localStorage.setItem("location", newLocation);
  }

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchWeather() {
        setIsLoading(true);

        try {
          const geoRes = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${location}`,
            { signal: controller.signal }
          );

          if (!geoRes.ok)
            throw new Error("There was an error fetching the weather");

          const geoData = await geoRes.json();

          if (!geoData.results) throw new Error("Location not found");

          const { latitude, longitude, timezone, name, country_code } =
            geoData.results.at(0);

          setDisplayName(`${name} ${convertToFlag(country_code)}`);

          // 2) Getting actual weather
          const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`,
            { signal: controller.signal }
          );

          if (!weatherRes.ok)
            throw new Error("There was an error fetching the weather");

          const weatherData = await weatherRes.json();
          setWeather(weatherData.daily);
        } catch (err) {
          if (err.name !== "AbortError") console.error(err);
        } finally {
          setIsLoading(false);
        }
      }

      if (location.length < 2) return setWeather({});

      fetchWeather();

      return function () {
        controller.abort();
      };
    },
    [location]
  );

  return (
    <div className="app">
      <h1>Classy Weather</h1>
      <Input location={location} onChangeLocation={handleChangeLocation} />
      {isLoading && <p className="loader">Loading...</p>}
      {weather.weathercode && (
        <Weather weather={weather} location={displayName} />
      )}
    </div>
  );
}

function Input({ location, onChangeLocation }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search from location..."
        value={location}
        onChange={(e) => onChangeLocation(e.target.value)}
      />
    </div>
  );
}

function Weather({ weather, location }) {
  const {
    temperature_2m_max: max,
    temperature_2m_min: min,
    time: dates,
    weathercode: codes,
  } = weather;

  return (
    <div>
      <h2>Weather {location}</h2>
      <ul className="weather">
        {dates.map((date, i) => (
          <Day
            date={date}
            max={max.at(i)}
            min={min.at(i)}
            code={codes.at(i)}
            key={date}
            isToday={i === 0}
          />
        ))}
      </ul>
    </div>
  );
}

function Day({ date, max, min, code, isToday }) {
  return (
    <li className="day">
      <span>{getWeatherIcon(code)}</span>
      <p>{isToday ? "Today" : formatDay(date)}</p>
      <p>
        {Math.floor(min)}&deg; &mdash; <strong>{Math.ceil(max)}&deg;</strong>
      </p>
    </li>
  );
}
