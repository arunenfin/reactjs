export const ACTIONTYPES = {
  SET_STATE: 'SET_STATE',
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR'
}

export const updateState = (data) => ({ type: ACTIONTYPES.SET_STATE, data });
export const toggleSidebar = () => ({ type: ACTIONTYPES.TOGGLE_SIDEBAR });