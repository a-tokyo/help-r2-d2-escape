import React from 'react';

import logo from './r2d2_icon.png';
import './Header.css';

const Header = () => (
  <header className="App-header text-center">
    <img src={logo} className="App-logo" alt="R2-D2" />
    <h3 className="App-title">Help R2-D2 Escape!</h3>
    <h5>
      An informative visualization of the different search types used by AI
      agents.
    </h5>
  </header>
);

export default Header;
