import React from "react";
import "./App.css";

class Movies extends React.Component {
  render() {
    return (
      <>
        <h4>
          Movies
          {this.props.movies.map((movie, idx) => (
            <div key={`movie-${idx}`}>
              <p>{movie.title}</p>
              {movie.averageVotes}
              {movie.totalVotes}
              <img className="map" src={movie.poster} alt="" />
              {movie.summary}
              {movie.releasedDate}
            </div>
          ))}
        </h4>
      </>
    );
  }
}

export default Movies;
