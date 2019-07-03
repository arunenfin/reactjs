export const ACTIONTYPES = {
  SET_STATE: 'SET_STATE',
  TOGGLE_FULLSCREEN: 'TOGGLE_FULLSCREEN'
}

export const updateState = (data) => ({ type: ACTIONTYPES.SET_STATE, data });
export const toggleFullScreen = () => ({ type: ACTIONTYPES.TOGGLE_FULLSCREEN });