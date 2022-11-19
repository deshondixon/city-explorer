import React from "react";
import axios from "axios";
import Badge from "react-bootstrap/Badge";
import Movies from "./Movies";
import "./App.css";
import Weather from "./Weather";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      cityData: {},
      errorMessage: "",
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
        movies: movieData.data,
        isError: false,
      });
    } catch (error) {
      this.setState({
        errorMessage: error.message,
        isError: true,
      });
    }
  };

  handleSubmit = async (event) => {
    try {
      event.preventDefault();

      let locationInfo = await axios.get(
        `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`
      );

      this.setState(
        {
          cityData: locationInfo.data[0],
          isError: false,
        },
        this.handleWeather
      );
      this.handleMovies();
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
            <h2> {this.state.cityData.display_name}</h2>
            {this.state.cityData.lat && (
              <img className="map" src={mapURL} alt={this.state.city + "map"} />
            )}

            <p className="latitudes"> Latitude: {this.state.cityData.lat} </p>
            <p className="longitudes"> Latitude: {this.state.cityData.lat} </p>

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
          <Weather
            forecast={this.state.forecast}
            handleMovies={this.handleWeather}
            handleSubmit={this.handleSubmit}
            handleInputChange={this.handleInputChange}
            city={this.state.city}
            cityData={this.state.cityData}
          />
          <Movies
            movies={this.state.movies}
            handleMovies={this.handleMovies}
            handleSubmit={this.handleSubmit}
            handleInputChange={this.handleInputChange}
            city={this.state.city}
          />
        </main>

        <footer> ⒸDeShon Dixon 2022 </footer>
      </>
    );
  }
}

export default App;
