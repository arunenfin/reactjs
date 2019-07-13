import { ACTIONTYPES } from './actions';

const initialState = {
  sidebarOpen: false
};

function reducer(state = initialState, action) {
  switch(action.type) {
    case ACTIONTYPES.SET_STATE:
      return { ...state, ...action.data }
    case ACTIONTYPES.TOGGLE_SIDEBAR:
      return { ...state, sidebarOpen: !state.sidebarOpen }
    default:
      return state;
  }
}

export default reducer;