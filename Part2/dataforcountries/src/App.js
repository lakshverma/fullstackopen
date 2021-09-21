import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = ({ inputValue, searchChangeHandler }) => {
  return (
    <div>
      <p>find countries</p>
      <input value={inputValue} onChange={searchChangeHandler} />
    </div>
  );
};

const Countries = ({ countries, filterText, buttonHandler, api_key }) => {
  const filteredCountries = countries.filter((singleCountry) =>
    singleCountry.name.toLowerCase().includes(filterText.toLowerCase())
  );

  if (filterText === "" || filteredCountries.length === 0) {
    return <p> Enter a valid country name. </p>;
  } else if (filteredCountries.length > 10) {
    return <p> Too many matches, specify another filter </p>;
  } else if (filteredCountries.length > 1) {
    return (
      <ul>
        {filteredCountries.map((singleCountry) => (
          <li key={singleCountry.numericCode}>
            {singleCountry.name}
            <button onClick={() => buttonHandler(singleCountry.name)}>
              {" "}
              Click me!{" "}
            </button>
          </li>
        ))}
      </ul>
    );
  } else {
    return (
      <div>
        <h1> {filteredCountries[0].name} </h1>
        <p> capital {filteredCountries[0].capital} </p>
        <p> population {filteredCountries[0].population} </p>
        <h2> languages </h2>
        <ul>
          {filteredCountries[0].languages.map((language) => (
            <li key={language.iso639_1}> {language.name} </li>
          ))}
        </ul>
        <img
          src={filteredCountries[0].flag}
          alt="Country flag"
          width="256"
          height="128"
        />

        <Weather cityName={filteredCountries[0].capital} api_key={api_key} />
      </div>
    );
  }
};

const Weather = ({ cityName, api_key }) => {
  const [cityWeather, setCityWeather] = useState();

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${api_key}`
      )
      .then((response) => {
        console.log(response.data);
        setCityWeather(response.data);
      });
  }, [cityName, api_key]);

  console.log(cityWeather);
  // Since weather data is fetched asynchronously and takes time, cityWeather would be an empty array on initial render
  if (!cityWeather) {
    return null;
  } else {
    const weatherIcon = `http://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png`;
    return (
      <div>
        <h2> Weather in {cityName} </h2>
        <p> temperature: {cityWeather.main.temp} celsius</p>
        <img
          src={weatherIcon}
          alt={cityWeather.weather[0].description}
          width="64"
          height="64"
        />
        <p> wind: {cityWeather.wind.speed} m/s</p>
      </div>
    );
  }
};

const App = () => {
  const [country, setCountry] = useState([]);
  const [filter, setFilter] = useState("");
  const api_key = process.env.REACT_APP_FREE_API_KEY;

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      console.log("data fetched from axios");
      setCountry(response.data);
    });
  }, []);

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const handleShowButton = (clickedCountry) => {
    setFilter(clickedCountry);
  };

  return (
    <div className="App">
      <Search inputValue={filter} searchChangeHandler={handleFilter} />
      <Countries
        countries={country}
        filterText={filter}
        buttonHandler={handleShowButton}
        api_key={api_key}
      />
    </div>
  );
};

export default App;
