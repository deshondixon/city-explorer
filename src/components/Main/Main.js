import React from 'react';
import axios from 'axios';
import Movies from '../Movies/Movies';
import Weather from '../Weather/Weather';
import './Main.css';


class Main extends React.Component {
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
      let weatherUrl = `${process.env.REACT_APP_SERVER}/weather?lat=${this.state.cityData.lat}&lon=${this.state.cityData.lon}`;

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
        <main>
          <form onSubmit={this.handleSubmit}>
            <h2> {this.state.cityData.display_name}</h2>
            {this.state.cityData.lat && (
              <img className='map' src={mapURL} alt={this.state.city + 'map'} />
            )}

            <p className='latitudes'> Latitude: {this.state.cityData.lat} </p>
            <p className='longitudes'> Longitude: {this.state.cityData.lon} </p>

            {this.state.isError ? (
              <h3> {this.state.errorMessage} </h3>
            ) : (
              <ul> </ul>
            )}
            <label>
              <input
                type='text'
                name='city'
                onChange={this.handleInputChange}
              />
            </label>
            <button type='submit'> EXPLORE </button>
          </form>
          <Weather
            show={this.state.isModalShown}
            onHide={this.closeModal}
            forecast={this.state.forecast}
            handleWeather={this.handleWeather}
            handleSubmit={this.handleSubmit}
            handleInputChange={this.handleInputChange}
            city={this.state.city}
            cityData={this.state.cityData}
          />
          <Movies
            show={this.state.isModalShown}
            onHide={this.closeModal}
            movies={this.state.movies}
            handleMovies={this.handleMovies}
            handleSubmit={this.handleSubmit}
            handleInputChange={this.handleInputChange}
            city={this.state.city}
          />
        </main>
      </>
    );
  }
}

export default Main;
