import WeatherInfo from "./WeatherInfo";

const Country = ({ country }) => {
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital?.[0]}</p>
        <p>Area: {country.area}</p>
  
        <h3>Languages:</h3>
        <ul>
          {country.languages && Object.values(country.languages).map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
  
        <img src={country.flags?.png} alt={country.flags.alt} width="150" />

        {country.capital && <WeatherInfo capital={country.capital?.[0]} />}
      </div>
    );
  };
  
  export default Country;
  