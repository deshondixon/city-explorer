import React from "react";
import "./Weather.css";
import WeatherDay from "./WeatherDay";

class Weather extends React.Component {
  render() {
    let weatherArr = this.props.forecast.map((day, idx) => {
      return (
        <WeatherDay day={day.date} description={day.description} key={idx} />
      );
    });
    return (
      <>
      {weatherArr}
      </>
          )
  }
}

export default Weather;
