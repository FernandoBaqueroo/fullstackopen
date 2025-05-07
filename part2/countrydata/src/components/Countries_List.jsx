import React from 'react';

const Countries_List = ({ filteredCountries, onShowCountry }) => {
  return (
    <ul>
      {filteredCountries.map((country) => (
        <li key={country.name.common}>
          {country.name.common}{' '}
          <button onClick={() => onShowCountry(country)}>Show</button>
        </li>
      ))}
    </ul>
  );
};

export default Countries_List;
