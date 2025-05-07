import { useEffect, useState } from 'react'
import countries_services from './services/countries_services'
import Countries_List from './components/Countries_List'
import Country from './components/Country';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    countries_services.getAllCountries().then((response) => {
      if(response && response.data) {
        setCountries(response.data);
        //console.log(`DATA: ${response.data}`)
      } else {
        console.error("No data found in the response")
      }
    });
  };

  const handleFilterCountry = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchCountry(searchValue);

    if (searchValue === '') {
      setFilteredCountries([]);
    } else {
      setFilteredCountries(
        countries.filter(
          (country) =>
            country.name &&
            country.name.common.toLowerCase().includes(searchValue)
        )
      );
    }
    setSelectedCountry(null);
  };

  const handleShowCountry = (country) => {
    setSearchCountry(country.name.common.toLowerCase());
    setSelectedCountry(country);
  };

  const renderContent = () => {

    if (selectedCountry) {
      return <Country country={selectedCountry} />;
    }

    if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else if (filteredCountries.length === 1) {
      return <Country country={filteredCountries[0]} />;
    } else if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
      return <Countries_List filteredCountries={filteredCountries} onShowCountry={handleShowCountry}/>;
    } else {
      return null;
    }
  };

  return (
    <div>
      <p>find countries <input type="text" value={searchCountry} onChange={handleFilterCountry}/></p>
      {renderContent()}
    </div>
  )
}

export default App;
