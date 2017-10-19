import React from 'react';

import logo from './r2d2_icon.png';
import './Header.css';

const Header = () => (
  <header className="App-header text-center">
    <img src={logo} className="App-logo" alt="logo" />
    <h1 className="App-title">Help R2-D2 Escape!</h1>
    <h4>
      An informative visualization of the different search types used by AI
      agents.
    </h4>
  </header>
);

export default Header;
