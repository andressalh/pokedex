import React from 'react';
import './App.css';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Pokedex from './pages/Pokedex';

function App() {
  return (
      <Router>
      <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/pokemon/:pokemonNumber" component={Pokedex} />
          </Switch>
      </div>
      </Router>
  );
}

export default App;
