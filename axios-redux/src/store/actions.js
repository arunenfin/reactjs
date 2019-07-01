export const ACTIONTYPES = {
  SET_STATE: 'SET_STATE'
}

export const updateState = (data) => ({ type: ACTIONTYPES.SET_STATE, data });