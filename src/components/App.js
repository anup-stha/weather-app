import React, { useState, useRef } from "react";
import styled from "styled-components";
import SearchCity from "./SearchCity";
import device from "../responsive/Device";
import Result from "./Result";
import NotFound from "./NotFound";

import axios from "axios";

import { months, days } from "./date";

const MainWrapper = styled.div`
  min-height: 100vh;
  background: rgb(18, 16, 55);
  background: linear-gradient(
    90deg,
    rgba(18, 16, 55, 1) 0%,
    rgba(13, 13, 79, 1) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InsideWrapper = styled.div`
  background: white;
  min-height: 80vh;
  max-height: 80vh;
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.1)
  );
  border-radius: 1rem;
  z-index: 3;
  backdrop-filter: blur(1rem);
  filter: drop-shadow(0px 30px 30px rgba(0, 0, 0, 0.3));
  transition: all 1s ease;
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
  transition: all 1s ease;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: ${(props) => (props.showResult ? "row" : "column")};
  margin-top: 2%;
  margin-bottom: 2%;
  justify-content: space-between;
  align-items: center;
  transition: all 1s ease;
  padding: 0 40px;

  ${({ showResult }) =>
    !showResult &&
    `
    min-height:80vh;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `}
`;

const AppTitle = styled.h1`
  color: #fff;
  font-weight: normal;
  font-size: ${(props) => (props.showResult ? "1.7rem" : "4rem")};
  text-shadow: horizontal-offset vertical-offset blur color;
  text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.3);
  letter-spacing: 0.2em;

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
  transition: font-size ease 1s;
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
      console.log(currentData);
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
  console.log((weatherInfo || error) && true);

  return (
    <>
      <MainWrapper>
        <InsideWrapper>
          <HeaderWrapper showResult={(weatherInfo || error) && true}>
            <AppTitle showResult={(weatherInfo || error) && true}>
              WEATHER FORECAST
            </AppTitle>

            <SearchCity
              value={value}
              showResult={(weatherInfo || error) && true}
              change={handleInputChange}
              submit={handleSearchCity}
            />
          </HeaderWrapper>
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
