> Please refer the folder `state-lifecycle` for the complete code. To run the code open the folder in VS Code and type ``ctrl + ` `` to open terminal. Then run `npm install`. When package installation finishes run `npm start`.
## State and Lifecycle Methods

 - Convert `./src/components/Home.js` to a Class component.
 - Initialize a local state property called `keyData` by including `state  = { keyData:  null }` in the `Home` component.
 - Important lifecycle methods to remember are `componentDidMount`, `componentDidUpdate` and `componentWillUnmount`. 
 - The `componentDidMount()` method runs after the component output has been rendered to the DOM. 
 - If the `Home` component is ever removed from the DOM, React calls the `componentWillUnmount()` lifecycle method. 
 - `componentDidUpdate()` is invoked immediately after `Home` component has been updated. This method is not called for the initial render.
 - Here we are using `componentDidMount` and `componentWillUnmount()` to register and unregister `keydown` event handler.
 - The state is updated using `this.setState()` method. Any change to the state re-renders or updates the component. 
## Handling Events
 - See `src/components/About.js` for examples of `click` and `change` events.
 - In the `_handleToggleContent` event handler we are using a callback function to update the `showContent` state. Since `this.props` and `this.state` may be updated asynchronously, we should use a callback function to update a state property whose value depends on its previous state.
## Adding Bootstrap
 - Install bootstrap package by running `npm install --save bootstrap`
 - Import Bootstrap CSS in the src/index.js file `import 'bootstrap/dist/css/bootstrap.min.css';`
 - For bootstrap components install `reactstrap` package. https://reactstrap.github.io/

## References

 - [https://reactjs.org/docs/state-and-lifecycle.html](https://reactjs.org/docs/state-and-lifecycle.html)
 - [https://reactjs.org/docs/handling-events.html](https://reactjs.org/docs/handling-events.html)
 - [https://reactjs.org/docs/conditional-rendering.html](https://reactjs.org/docs/conditional-rendering.html)
 - [https://hackernoon.com/reactjs-component-lifecycle-methods-a-deep-dive-38275d9d13c0](https://hackernoon.com/reactjs-component-lifecycle-methods-a-deep-dive-38275d9d13c0)
