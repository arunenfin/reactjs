export const ACTIONTYPES = {
  SET_STATE: 'SET_STATE',
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
  ADD_USERS: 'ADD_USERS',
  DELETE_USERS: 'DELETE_USERS'
}

export const updateState = (data) => ({ type: ACTIONTYPES.SET_STATE, data });
export const toggleSidebar = () => ({ type: ACTIONTYPES.TOGGLE_SIDEBAR });
export const addUsers = (data) => ({ type: ACTIONTYPES.ADD_USERS, data: data });
export const deleteUsers = (id) => ({ type: ACTIONTYPES.DELETE_USERS, id: id });