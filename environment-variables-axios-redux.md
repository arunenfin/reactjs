> Please refer the folder `axios-redux` for the complete code. To run the code open the folder in VS Code and type ``ctrl + ` `` to open terminal. Then run `npm install`. When package installation finishes run `npm start`.
## Using Environment Variables

 - You can use environment variables in react by adding two files `.env.development` and `.env.production` to the root folder (outside the `src` folder).
 - You can create custom environment variables beginning with `REACT_APP_`. Any other variables except `NODE_ENV` will be ignored. Changing any environment variables will require you to restart the development server if it is running.
 - During development (when you run `npm start` the variables defined in `.env.development` file will be used.
 - When you create a production build by running `npm run build` the variables defined in `.env.production` will be used.
 - Define the same variables in both `.env.development` and `.env.production`.  These variables can be used in react components by using `process.env`. For example, if I have defined an environment variable `REACT_APP_API_URL` I can get that value in a react component using `process.env.REACT_APP_API_URL`.
## API requests using Axios
 - Install the axios package by running `npm install --save axios`.
 - Create a file `src/lib/axioslib.js` with the following contents.
```javascript
import axios from 'axios';

const Axioslib = axios.create({
  baseURL : process.env.REACT_APP_API_URL
});

export default Axioslib;
```

 - Here we are setting the baseURL for API requests as the environment variable set in the .env files. 
 - Create a new component called `users.js` inside `src/components/` folder.
 - Here we are importing the `axioslib.js` file and using it to make API requests to a remote server.
 - We are making a GET request to `https://reqres.in/api/users?page=${page}` get the list of users in the `getUsers` method. Please note that here the baseURL `https://reqres.in/api/` will be prepended to `/users?page=${page}`.
 - We are storing the response form server in a state variable `users` and listing the data using the function `listUsers`. In order to list the data we are using the javascript array method `map`. 
 - Notice that the `tr` element has a `key` attribute. Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity. The best way to pick a key is to use a string that uniquely identifies a list item among its siblings. Most often you would use IDs from your data as keys
## Redux
 - Redux is used to store the entire state of the application in an object.
 - Data stored in a Redux store can be accessed by any component. So it is used to share state data between components.
 - You can change the state of the application by emitting actions.
 - Reducer functions are used to change the state according to specific actions. Reducers are just pure functions that take the previous state and an action, and return the next state. 
 - Install Redux and React-Redux by running `npm install --save redux react-redux`. React-Redux is used to connect React with the Redux store.
## References

 - https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables
 - https://reactjs.org/docs/lists-and-keys.html
