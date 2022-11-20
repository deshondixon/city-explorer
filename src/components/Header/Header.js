import React from 'react';
import Badge from "react-bootstrap/Badge";
import './Header.css';

class Header extends React.Component {
  render() {
    return (
      <>
        <h1>
          <Badge> City Explorer </Badge>
        </h1>
      </>
    );
  }
}

export default Header;
