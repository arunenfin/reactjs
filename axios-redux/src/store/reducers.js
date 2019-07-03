import { ACTIONTYPES } from './actions';

const initialState = {
  fullScreen: false
};

function reducer(state = initialState, action) {
  switch(action.type) {
    case ACTIONTYPES.SET_STATE:
      return { ...state, ...action.data }
    case ACTIONTYPES.TOGGLE_FULLSCREEN:
      return { ...state, fullScreen: !state.fullScreen }
    default:
      return state;
  }
}

export default reducer;