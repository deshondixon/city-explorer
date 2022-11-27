import React from 'react';
import './Weather.css';
import Card from "react-bootstrap/Card";

class WeatherDay extends React.Component {
  render() {
    return (
      <Card className="weatherman" style={{ width: "5rem" }}>
        <Card.Title>Three Day Forecast</Card.Title>
        <Card.Text>{this.props.day}</Card.Text>
        <Card.Text>{this.props.description}</Card.Text>
      </Card>
    );
  }
}

export default WeatherDay;
