# Country Data Application

This is a country data application built with React and Vite. It allows users to search for countries, view detailed information about a selected country, and check the current weather in its capital city.

## Features

- **Search Countries**: Filter countries by name using a search input.
- **View Country Details**: Display detailed information about a selected country, including its name, population, region, and flag.
- **Weather Information**: Show the current weather in the capital city of a selected country, including temperature, wind speed, and conditions.
- **Dynamic Rendering**: Automatically updates the displayed data based on user interactions.

## Technologies Used

- **Frontend**: React with Vite.
- **Styling**: Basic CSS.
- **HTTP Requests**: Axios.
- **API Integration**: REST Countries API for country data and Weather API for weather information.

## Installation and Setup

1. Clone this repository:

   ```bash
   git clone <REPOSITORY_URL>
   cd countrydata

2. Install dependencies:

   ```bash
   npm install

3. Start the development server:

   ```bash
    npm run dev

4. Configure the Weather API key:
- Create a .env file in the root of the project.
- Add your Weather API key as follows:

   ```bash
   VITE_WEATHER_API_KEY=your_api_key_here