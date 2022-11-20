import React from 'react';
import Main from './components/Main/Main.js'
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import './App.css';

class App extends React.Component {

  render() {

    return (
      <>
        <Header/>
        <Main/>
        <Footer/>
      </>
    );
  }
}

export default App;
