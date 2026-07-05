import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";

const Weather = () => {
  const inputRef = useRef();
  const [searchLoc, setSearchLoc] = useState("");
  const [weatherData, setWeatherData] = useState(false);

  const search = async (city) => {
    if (city.trim() === "") {
      alert("Enter City/Country Name ");
      return;
    }

    const Url = ` https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
    const response = await fetch(Url);
    const data = await response.json();
    if (!response.ok) {
      alert(data.message);
      return;
    }
    const icon = data.weather[0].icon;
    const WeatherUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    // console.log(WeatherUrl);
    //console.log(data)
    setWeatherData({
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      temperature: Math.floor(data.main.temp),
      location: data.name,
      icon: WeatherUrl,
    });
  };

  useEffect(() => {
    search("London");
  }, []);

  useEffect(() => {
    console.log(inputRef.current.value);
  }, [inputRef]);

  return (
    <div className="weather">
      <div className="search-bar">
        <input
          ref={inputRef}
          placeholder="Search"
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              search(inputRef.current.value);
            }
          }}
        ></input>
        <img
          src={search_icon}
          onClick={() => search(inputRef.current.value)}
          alt=""
        />
      </div>
      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="" className="weather-icon  " />
          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col wind">
              <img src={wind_icon} alt="" />
              <div>
                <p>{weatherData.windSpeed}km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default Weather;
