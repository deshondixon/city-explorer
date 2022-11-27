import React from "react";
import "./Movies.css";
import Card from "react-bootstrap/Card";

class Movie extends React.Component {
  render() {
    return (
      <Card className="movies" style={{ width: "5rem" }}>
        <Card.Img src={this.props.poster}></Card.Img>
        <Card.Title>{this.props.title}</Card.Title>
        <Card.Text>{this.props.release}</Card.Text>
        <Card.Text>{this.props.summary}</Card.Text>
      </Card>
    );
  }
}

export default Movie;
