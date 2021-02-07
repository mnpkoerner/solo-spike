import React from 'react';
import Splash from '../Splash/Splash.jsx'
import Stage00 from '../Stage00/Stage00.jsx'
import Stage1 from '../Stage1/Stage1.jsx'
import Stage2 from '../Stage2/Stage2.jsx'
import Stage3 from '../Stage3/Stage3.jsx'
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';
import './App.css';

function App() {


  return (
    <Router>
    <div className="App">
      <header className="App-header">

      <Route
          exact
          path='/'>
        <Splash />
      </Route>
      <Route
        exact
        path='/zendo'>
        <Stage00 />
      </Route>

      </header>
    </div>
    </Router>
  );
}

export default App;
