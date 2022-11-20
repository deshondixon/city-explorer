import React from 'react';
import './Weather.css';

class Weather extends React.Component {
  render() {
    return (
      <>
        <h4>
          Three Day Forecast
          {this.props.forecast.map((day, idx) => (
            <div key={`weather-${idx}`}>
              <p>{day.date}</p>
              <h5> {day.description} </h5>
            </div>
          ))}
        </h4>
      </>
    );
  }
}

export default Weather;
