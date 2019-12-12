import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Documents from './components/Documents';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Documents} />
      </Switch>
    </Router>
  );
}

export default App;
