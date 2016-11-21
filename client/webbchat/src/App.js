import React, { Component } from 'react';
import logo from './logo.svg';
import Hello from './components/Hello'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Hello name={'team-4'}/>
        
      </div>
    );
  }
}

export default App;
