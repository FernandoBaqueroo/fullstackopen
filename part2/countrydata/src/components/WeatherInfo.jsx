import { useEffect, useState } from "react";
import api from "../services/countries_services";

const WeatherInfo = ({ capital }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!capital) return null;

    api.getWeatherForCity(capital)
      .then(setWeather)
      .catch((error) => {
        console.error("Error obteniendo clima:", error);
      });
  }, [capital]);

  if (!weather) return <p>Cargando clima...</p>;

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>Temperature: {weather.current.temp_c} °C</p>
      <img src={`https:${weather.current.condition.icon}`} alt={weather.current.condition.text} />
      <p>Wind: {weather.current.wind_kph} km/h</p>
      <p>Condition: {weather.current.condition.text}</p>
    </div>
  );
};

export default WeatherInfo;
