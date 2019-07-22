import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import Users from './components/Users';
import EditUser from './components/EditUser';
import AddUser from './components/AddUser';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about/" component={About} />
        <Route path="/users/edit/:id" component={EditUser} />
        <Route path="/users/add" component={AddUser} />
        <Route path="/users/" component={Users} />
      </Switch>
    </Router>
  );
}

export default App;