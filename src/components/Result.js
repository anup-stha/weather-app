import React from "react";
import "./Result.sass";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tilt from "./TIlt";
import {
  faCloud,
  faBolt,
  faCloudRain,
  faCloudShowersHeavy,
  faSnowflake,
  faSun,
  faSmog,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import device from "../responsive/Device";
import ForecastHour from "./ForecastHour";
import ResultFadeIn from "./ResultFadeIn";
import BigLabel from "./BigLabel";
import MediumLabel from "./MediumLabel";
import SmallLabel from "./SmallLabel";
import Text from "./Text";
import VanillaTilt from "vanilla-tilt";
import Carousel from "react-elastic-carousel";

const Results = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 0px 10px;
  margin: 10px;

  animation: ${ResultFadeIn} 0.5s 1.4s forwards;
  height: 100%;
  grid-template-areas:
    "city des details details"
    "hour hour hour hour";
`;

const CityDateWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex-basis: 100%;
  height: 200px;
  padding-left: 10px;
  gap: 6px;
  background: rgba(186, 186, 186, 0.5);
  box-shadow: 0 4px 8px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  @media ${device.mobileL} {
    flex-basis: 50%;
    padding-right: 10px;
  }
  @media ${device.tablet} {
    grid-template-columns: 1fr 1fr;
    padding-right: 20px;
  }
`;

const CurrentWeatherWrapper = styled.div`
  grid-area: des;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  flex-basis: 100%;
  padding: 0px 10px;
  gap: 20px;
  background: rgba(186, 186, 186, 0.5);
  box-shadow: 0 4px 8px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  @media ${device.mobileL} {
    flex-basis: 50%;
    padding-right: 10px;
  }
  @media ${device.tablet} {
    grid-template-columns: 1fr 1fr;
    padding-right: 20px;
  }
`;

const WeatherIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  color: #ffffff;
  @media ${device.tablet} {
    font-size: 40px;
    justify-content: flex-end;
  }
  @media ${device.laptop} {
    font-size: 60px;
  }
  @media ${device.laptopL} {
    font-size: 40px;
  }
`;

const TemperatureWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Temperature = styled.h3`
  font-size: 30px;
  font-weight: 400;
  color: #ffffff;
  @media ${device.tablet} {
    font-size: 50px;
  }
  @media ${device.laptop} {
    font-size: 30px;
  }
  @media ${device.laptopL} {
    font-size: 50px;
  }
`;

const WeatherDetailsWrapper = styled.div`
  display: flex;
  height: 200px;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  padding: 0px 0;
  gap: 10px;

  @media ${device.mobileL} {
    flex-basis: 50%;
  }
`;

const WeatherDetail = styled.div`
  flex-basis: calc(100% / 3);
  padding: 10px;
  height: 90px;
  width: 140px;
  background: rgba(186, 186, 186, 0.5);
  box-shadow: 0 4px 8px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  @media ${device.laptop} {
    padding: 10px 10px;
  }
`;

const ForecastWrapper = styled.div`
  grid-area: hour;
  flex-basis: 100%;

  overflow: hidden;
`;

const Forecast = styled.div`
  position: relative;
  display: flex;
  overflow-x: hidden;
  overflow-y: hidden;
  scrollbar-color: lightgray #ffffff;
  scrollbar-width: thin;
  margin-top: 20px;

  @media ${device.laptop} {
    order: 4;
  }
`;

const Result = ({ weather }) => {
  const {
    city,
    country,
    date,
    description,
    main,
    temp,
    sunset,
    sunrise,
    humidity,
    wind,
    highestTemp,
    lowestTemp,
    forecast,
  } = weather;

  let weatherIcon = null;

  if (main === "Thunderstorm") {
    weatherIcon = <FontAwesomeIcon icon={faBolt} />;
  } else if (main === "Drizzle") {
    weatherIcon = <FontAwesomeIcon icon={faCloudRain} />;
  } else if (main === "Rain") {
    weatherIcon = <FontAwesomeIcon icon={faCloudShowersHeavy} />;
  } else if (main === "Snow") {
    weatherIcon = <FontAwesomeIcon icon={faSnowflake} />;
  } else if (main === "Clear") {
    weatherIcon = <FontAwesomeIcon icon={faSun} />;
  } else if (main === "Clouds") {
    weatherIcon = <FontAwesomeIcon icon={faCloud} />;
  } else {
    weatherIcon = <FontAwesomeIcon icon={faSmog} />;
  }

  const options = {
    scale: 1.2,
    speed: 1000,
    max: 30,
  };
  const forecasts = forecast.map((item) => (
    <Tilt
      options={options}
      style={{ flexShrink: 0, flexBasis: "140px", padding: "0 10px" }}
    >
      <ForecastHour
        key={item.dt}
        temp={Math.floor(item.main.temp * 1) / 1}
        icon={item.weather[0].icon}
        month={item.dt_txt.slice(5, 7)}
        day={item.dt_txt.slice(8, 10)}
        hour={item.dt_txt.slice(11, 13) * 1}
      />
    </Tilt>
  ));
  return (
    <Results>
      <Tilt options={options} style={{ gridArea: "city" }}>
        <CityDateWrapper>
          <BigLabel>
            {city}, {country}
          </BigLabel>
          <SmallLabel weight="400">{date}</SmallLabel>
        </CityDateWrapper>
      </Tilt>
      <Tilt options={options} style={{ gridArea: "des" }}>
        <CurrentWeatherWrapper>
          <WeatherIcon>{weatherIcon}</WeatherIcon>
          <TemperatureWrapper>
            <Temperature>{Math.floor(temp)}&#176;</Temperature>
            <SmallLabel weight="400" firstToUpperCase>
              {description}
            </SmallLabel>
          </TemperatureWrapper>
        </CurrentWeatherWrapper>
      </Tilt>
      <div style={{ gridArea: "details" }}>
        <WeatherDetailsWrapper>
          <Tilt options={options}>
            <WeatherDetail>
              <SmallLabel align="center" weight="400">
                {Math.floor(highestTemp)}&#176;
              </SmallLabel>
              <Text align="center">High Temp</Text>
            </WeatherDetail>
          </Tilt>

          <Tilt options={options}>
            <WeatherDetail>
              <SmallLabel align="center" weight="400">
                {wind}mph
              </SmallLabel>
              <Text align="center">Wind</Text>
            </WeatherDetail>
          </Tilt>
          <Tilt options={options}>
            <WeatherDetail>
              <SmallLabel align="center" weight="400">
                {sunrise}
              </SmallLabel>
              <Text align="center">Sunrise</Text>
            </WeatherDetail>
          </Tilt>
          <Tilt options={options}>
            <WeatherDetail>
              <SmallLabel align="center" weight="400">
                {Math.floor(lowestTemp)}&#176;
              </SmallLabel>
              <Text align="center">Low Temp</Text>
            </WeatherDetail>
          </Tilt>
          <Tilt options={options}>
            <WeatherDetail>
              <SmallLabel align="center" weight="400">
                {humidity}%
              </SmallLabel>
              <Text align="center">Rain</Text>
            </WeatherDetail>
          </Tilt>
          <Tilt options={options}>
            <WeatherDetail>
              <SmallLabel align="center" weight="400">
                {sunset}
              </SmallLabel>
              <Text align="center">Sunset</Text>
            </WeatherDetail>
          </Tilt>
        </WeatherDetailsWrapper>
      </div>

      <ForecastWrapper>
        <SmallLabel font-weight={200}>HOURLY DATA</SmallLabel>
        <Carousel focusOnSelect={true} itemsToShow={5} itemsToScroll={4}>
          {forecasts}
        </Carousel>
      </ForecastWrapper>
    </Results>
  );
};

Result.propTypes = {
  weather: PropTypes.shape({
    city: PropTypes.string,
    country: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
    main: PropTypes.string,
    temp: PropTypes.number,
    sunrise: PropTypes.string,
    sunset: PropTypes.string,
    humidity: PropTypes.number,
    wind: PropTypes.number,
    highestTemp: PropTypes.number,
    lowestTemp: PropTypes.number,
    forecast: PropTypes.array,
  }).isRequired,
};

export default Result;
