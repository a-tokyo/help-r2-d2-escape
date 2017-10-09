import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Game } from './containers';
import { generateGrid } from './services';

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Help R2-D2 Escape!</h1>
    </header>
    <p className="App-intro">
      To get started, edit <code>src/App.js</code> and save to reload.
    </p>
    <Game />
  </div>
);

export default App;
