import React from 'react';
import axios from 'axios';
import Badge from 'react-bootstrap/Badge';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: {},
      isError: false,
      errorMessage: '',
      isModalShown: false,
    }
  }

  handleInputChange = (event) => {
    this.setState({
      city: event.target.value,
    })
  }

  handleSubmit = async (event) => {
    try {
      event.preventDefault();
      let locationInfo = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`);
      this.setState({
        cityData: locationInfo.data[0],
        isError: false,
      });
    } catch (error) {
      this.setState({
        errorMessage: error.message,
        isError: true,
     //   isModalShown: true,
      })
    }
  }

 // handleCloseModal = () => {
 //   this.setState({
  //    isModalShown: false,
  //  })
 // }

  render() {

       let mapUrl = axios.get(`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=15`);

    return (
      <>
      <header>

        <h1><Badge>City Explorer</Badge>

        </h1>
        </header>
        <main>
        <form onSubmit={this.handleSubmit}>
          {this.state.isError ? <p>{this.state.errorMessage}</p> : <ul></ul>}
          <label>
            Search for a City
            <input type="text" name="city" onChange={this.handleInputChange} />
          </label>
          <button type="submit">Search for a City</button>
        </form>
        </main>
        <footer>Ⓒ DeShon Dixon 2022</footer>
      </>
    )
  }
}

export default App;
