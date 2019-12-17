import { ACTIONTYPES } from './actions';

const initialState = {
  sidebarOpen: false,
  users: []
};

function reducer(state = initialState, action) {
  switch(action.type) {
    case ACTIONTYPES.SET_STATE:
      return { ...state, ...action.data }
    case ACTIONTYPES.TOGGLE_SIDEBAR:
      return { ...state, sidebarOpen: !state.sidebarOpen }
    case ACTIONTYPES.ADD_USERS:
      // combine new array of users (action.data) with users array in redux
      const users = [...state.users, ...action.data];
      return { ...state, users: users }
    case ACTIONTYPES.DELETE_USERS:
      let usersList = [...state.users];
      const userIndex = usersList.findIndex(n => { return n.id === action.id });
      if(userIndex > -1){ usersList.splice(userIndex, 1) }
      return { ...state, users: usersList }
    default:
      return state;
  }
}

export default reducer;