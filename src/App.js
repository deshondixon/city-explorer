import React from "react";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      cityData: {},
      isError: false,
      errorMessage: "",
      //mapData: {}
    };
  };

  handleSubmit = async (event) => {
    try {
      event.preventDefault();
      console.log(this.state.city);
      let locationInfo = await axios.get(
        `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`
      );
      console.log(locationInfo.data[0]);
      this.setState({
        cityData: locationInfo.data[0],
        isError: false
      });
    } catch (error) {
      this.setState({
        errorMessage: error.message,
        isError: true
      });
    };
  };

  handleInputChange = (event) => {
    this.setState({
      city: event.target.value,
    });
  };

  render() {
    // handleMap = async (event) => {
    //   event.preventDefault();
    //   let mapUrl = await axios.get(
    //     `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.map}&zoom=13`
    // );
    // };
    //console.log(mapInfo.data[0]);
    // this.setState({
    //mapData: mapInfo.data[0]
    //isError: false
    // });

    return (
      <>
        <h1>City Explorer</h1>
        <form onSubmit={this.handleSubmit}>
          {this.state.isError ? <p>{this.state.errorMessage}</p> : <ul></ul>}
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
