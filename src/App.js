import React from "react";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      cityData: {}
    };
  }

  handleInputChange = (event) => {
    this.setState({
      city: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    console.log(this.state.city);
    let locationInfo = await axios.get(
      `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`
    );
    console.log(locationInfo.data[0]);
    this.setState({
      cityData: locationInfo.data[0]
    });
  };

  render() {
    return (
      <>
        <h1>City Explorer</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Search for a City
            <input type="text" name="city" onChange={this.handleInputChange} />
          </label>
          <button type="submit">Search for a City</button>
        </form>
      </>
    );
  }
}

export default App;
