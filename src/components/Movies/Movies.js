import React from 'react';
import Movie from './Movie';
import './Movies.css';

class Movies extends React.Component {
  render() {
    let movieArr = this.props.movies.map((movie, idx) => {
      return (
        <Movie
        poster={movie.poster}
        title={movie.title}
        release={movie.releasedDate}
        summary={movie.summary}
        key={idx}
        />
      )
    })
    return (
      <>
      {movieArr}
      </>
          )
  }
}

export default Movies;
