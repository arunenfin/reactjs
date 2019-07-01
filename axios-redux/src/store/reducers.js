import { ACTIONTYPES } from './actions';

const initialState = {
  users: []
};

function reducer(state = initialState, action) {
  switch(action.type) {
    case ACTIONTYPES.SET_STATE:
      return { ...state, ...action.data }
    default:
      return state;
  }
}

export default reducer;