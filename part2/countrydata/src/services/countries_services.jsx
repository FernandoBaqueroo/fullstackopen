import axios from "axios";

const apiCountryUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const apiWeatherUrl = 'https://api.weatherapi.com/v1'
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;


const apiCountryClient = axios.create({
    baseURL: apiCountryUrl,
    timeout: 10000,
});

const apiWeatherClient = axios.create({
    baseURL: apiWeatherUrl,
    timeout: 10000,
});

const getAllCountries = async () => {
    try {
        const response = await apiCountryClient.get();

        return response;
    } catch (error ){
        console.error("Error fetching the countries data");
        return [];
    }
}

const getWeatherForCity = async (cityName) => {
    try {
        const response = await apiWeatherClient.get("/current.json", {
            params: {
                key: apiKey,
                q: cityName,
                aqi: "No" 
            },
        });

        return response.data;
    } catch (error ){
        console.error("Error fetching the weather data");
        return [];
    }
}

export default {
    getAllCountries: getAllCountries,
    getWeatherForCity: getWeatherForCity
}