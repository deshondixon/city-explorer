import React from "react";
import axios from "axios";
import Badge from "react-bootstrap/Badge";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: {},
      errorMessage: '',
      isError: false,
      forecast: [],
      movies: [],
    };
  }

  handleInputChange = (event) => {
    this.setState({
      city: event.target.value,
    });
  };

  handleWeather = async () => {
    try {
    let weatherUrl = `${process.env.REACT_APP_SERVER}/weather?weatherLat=${this.state.cityData.lat}&weatherLon=${this.state.cityData.lon}`;

    let weatherData = await axios.get(weatherUrl);

    this.setState({
      forecast: weatherData.data,
      isError: false,
    });
  } catch (error) {
    this.setState({
      errorMessage: error.message,
      isError: true,
    });
    
  }
  };

  handleMovies = async () => {
    try {
    let movieUrl = `${process.env.REACT_APP_SERVER}/movie?search=${this.state.city}`; 

    let movieData = await axios.get(movieUrl);

    this.setState({
      movie: movieData.data,
      isError: false,
    });
  } catch (error) {
    this.setState({
      errorMessage: error.message,
      isError: true,
    });
    
  }
  }
 

  handleSubmit = async (event) => {
    try {
      event.preventDefault();

      let locationInfo = await axios.get(
        `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`
      );
      
      this.setState({
        cityData: locationInfo.data[0],
        isError: false,
      },  this.handleWeather);

    } catch (error) {
      this.setState({
        errorMessage: error.message,
        isError: true,
      });
    }
   
  };
  

  render() {

    let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=30`;

    return (
      <>
        <header>
          <h1>
            <Badge> City Explorer </Badge>
          </h1>
        </header>
        <main>
          <form onSubmit={this.handleSubmit}>
            <h2> {this.state.cityData.display_name} 
            </h2>
            {this.state.cityData.lat && <img
              className="map"
              src={mapURL}
              alt={this.state.city + "map"}
            />}
            <h4>Three Day Forecast {this.state.forecast.map((day, idx) => (
              <div key={`weather-${idx}`}>
                <p>{day.date}</p>
                <h5> {day.description} </h5>
              </div>
            ))} </h4> 

            <p className="latitudes"> Latitude: {this.state.cityData.lat} </p>
            <p className="longitudes"> Latitude: {this.state.cityData.lat} </p>

            <h4> Movies {this.state.movies.map((movie, idx) => (
              <div key={`movie-${idx}`}>
                  <p>{movie.title}</p>
                  {movie.summary}
                  {movie.averageVotes}
                  {movie.totalVotes}
                  {movie.poster}
                  {movie.releasedDate}
              </div>
            ))} </h4>

            {this.state.isError ? (
              <h3> {this.state.errorMessage} </h3>
            ) : (
              <ul> </ul>
            )}
            <label>
              <input
                type="text"
                name="city"
                onChange={this.handleInputChange}
              />
            </label>
            <button type="submit"> Search for a City </button>
          </form>
        </main>
        <footer> ⒸDeShon Dixon 2022 </footer>
      </>
    );
  }
}

export default App;
