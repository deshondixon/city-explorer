import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.city.value);
  }

  handleInputChange = (e) => {
    this.setState({
      city: e.target.value

      });
    };

  render() {
    console.log(this.state.city);
    return (
      <>
        <h1>City Explorer</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Search for a City
            <input type="text" name="city" onChange={this.handleInputChange}/>
          </label>
          <button type="submit">Search for a City</button>
        </form>
      </>
    )
  }
}

export default App;
