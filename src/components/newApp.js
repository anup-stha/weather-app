import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchCity from "./SearchCity";
import device from "../responsive/Device";
import Result from "./Result";
import NotFound from "./NotFound";

import axios from "axios";

import { months, days } from "./date";

const MainWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(to right top, #65dfc9, #6cdbeb);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InsideWrapper = styled.div`
  background: white;
  min-height: 80vh;
  max-height: 90vh;
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.1)
  );
  border-radius: 1rem;
  z-index: 3;
  backdrop-filter: blur(4rem);
  filter: drop-shadow(0px 30px 30px rgba(0, 0, 0, 0.3));
  gap: 16px;
`;

const Circle = styled.div`
  background: white;
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.8),
    rgba(255, 255, 255, 0.3)
  );
  height: 10rem;

  width: 10rem;
  position: absolute;
  top: ${(props) => props.top}%;
  left: ${(props) => props.left}%;
  right: ${(props) => props.right}%;
  bottom: ${(props) => props.bottom}%;
  border-radius: 50%;
`;

const AppTitle = styled.h1`
  color: #fff;
  font-weight: normal;
  font-size: 4rem;
  text-shadow: horizontal-offset vertical-offset blur color;
  text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.3);
  letter-spacing: 0.2em;
  transition: 0.3s 1.4s;
  @keyframes slideInLeft {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(0.7);
    }

    100% {
      transform: scale(1);
    }
  }
  animation: 1s ease slideInLeft;

  ${({ showResult }) =>
    showResult &&
    `
    top: 10%;
  `}
`;

const NewApp = () => {
  const [value, setValue] = useState("");
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [error, setError] = useState(false);

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleSearchCity = async (e) => {
    e.preventDefault();
    try {
      const key = "f378cbad832572ab972b48c586b5b463";
      const currentResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${value}&APPID=${key}&units=metric`
      );
      const hourResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${value}&APPID=f378cbad832572ab972b48c586b5b463&units=metric`
      );

      const currentData = currentResponse.data;

      const hourData = hourResponse.data;

      const currentDate = new Date();
      const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
        months[currentDate.getMonth()]
      }`;
      const sunset = new Date(currentData.sys.sunset * 1000)
        .toLocaleTimeString()
        .slice(0, 5);
      const sunrise = new Date(currentData.sys.sunrise * 1000)
        .toLocaleTimeString()
        .slice(0, 5);
      const weatherInfoData = {
        city: currentData.name,
        country: currentData.sys.country,
        date,
        description: currentData.weather[0].description,
        main: currentData.weather[0].main,
        temp: currentData.main.temp,
        highestTemp: currentData.main.temp_max,
        lowestTemp: currentData.main.temp_min,
        sunrise,
        sunset,
        clouds: currentData.clouds.all,
        humidity: currentData.main.humidity,
        wind: currentData.wind.speed,
        forecast: hourData.list,
      };

      setWeatherInfo(weatherInfoData);
      setError(false);
    } catch (error) {
      setError(true);
      setWeatherInfo(null);
    }
  };

  return (
    <>
      <MainWrapper>
        <InsideWrapper>
          <AppTitle secondary showResult={(weatherInfo || error) && true}>
            WEATHER FORECAST
          </AppTitle>
          <SearchCity
            value={value}
            showResult={(weatherInfo || error) && true}
            change={handleInputChange}
            submit={handleSearchCity}
          />
          {weatherInfo && <Result weather={weatherInfo} />}
          {error && <NotFound error={error} />}
        </InsideWrapper>
        <Circle top="5" right="10" />
        <Circle bottom="5" left="10" />
      </MainWrapper>
    </>
  );
};

export default NewApp;
