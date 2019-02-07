import React from "react";

const Result = props => {
  const {
    error,
    city,
    sunrise,
    sunset,
    temp,
    pressure,
    wind,
    date
  } = props.weather;

  let content = null;

  if (!error && city) {
    const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
    const sunsetTime = new Date(sunset * 1000).toLocaleTimeString();

    content = (
      <>
        <h1>Result for city : {city}</h1>
        <div>Results for date: {date}</div>
        <div>Temperature: {temp} &deg;C</div>
        <div>Sunset: {sunsetTime}</div>
        <div>Sunrise: {sunriseTime}</div>
        <div>Pressure: {pressure} hPa</div>
        <div>Wind speed: {wind} m/s</div>
      </>
    );
  }

  return (
    <div className="result">
      {error ? `We have no information about ${city}` : content}
    </div>
  );
};

export default Result;

