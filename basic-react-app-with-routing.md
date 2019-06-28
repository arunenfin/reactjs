## Installing Node.js
 - To check whether or not Node.js is installed run `node -v`.  
 - If not install `nvm` by running `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash` in a terminal.
 - Install latest LTS version of node `nvm install --lts`
## Install `create-react-app`
 - Open a new terminal. Install `create-react-app` globally by running `npm i -g create-react-app`
## Create a ReactJs application
 - Create a new react application called `newapp` by running `create-react-app newapp`. This will create a folder called `newapp` and install the required packages.
 - Open the `newapp` folder in Visual Studio Code and press ``Ctrl + ` `` to open the terminal. Run `npm start`. This will start the app in development mode.
## Add new components
There are two types of components - function components and class components. Class components have access to [state](https://reactjs.org/docs/state-and-lifecycle.html) and component [lifecycle methods](https://reactjs.org/docs/state-and-lifecycle.html).
 - Create a folder called `components` in the src folder.
 - Add a function component called `Home.js` in the `components` folder. File names of components always begin with a capital letter.
```javascript
// ./src/components/Home.js
import React from 'react';

function Home(props) {
  return (
    <div>
      <h1>Homepage</h1>
      <p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
    </div>
  );
}

export default Home;
```
 - Add a class component called `About.js` in the `components` folder. 
```javascript
// ./src/components/About.js
import React, { Component } from 'react';

class About extends Component {
  render() {
    return (
      <div>
        <h1>About page</h1>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
      </div>
    );
  }
}

export default About;
```
## Basic Routing

 - Install React Router by running `npm install react-router-dom` in terminal.
 - Open `src/App.js` and change its content to the following
```javascript
// ./src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about/" component={About} />
      </Switch>
    </Router>
  );
}

export default App;
```
 - Create a new component called Navbar in `components` folder.
```javascript
// ./src/components/Navbar.js
import React from 'react';
import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
      <hr />
    </div>
  );
}

export default Navbar;
```
 - Modify `./src/components/Home.js` to include `Navbar`
```javascript
import React from 'react';
import Navbar from './Navbar';

function Home(props) {
  return (
    <div>
      <Navbar />
      <h1>Homepage</h1>
      <p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
    </div>
  );
}

export default Home;
```
 - Modify `./src/components/About.js` to include `Navbar`
```javascript
import React, { Component } from 'react';
import Navbar from './Navbar';

class About extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <h1>About page</h1>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
      </div>
    );
  }
}

export default About;
```
## References

 - [https://reactjs.org/docs/introducing-jsx.html](https://reactjs.org/docs/introducing-jsx.html)
 - [https://reactjs.org/docs/rendering-elements.html](https://reactjs.org/docs/rendering-elements.html)
 - [https://reactjs.org/docs/components-and-props.html](https://reactjs.org/docs/components-and-props.html)
