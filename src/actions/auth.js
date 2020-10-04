export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const SET_AUTH_STATE = 'SET_AUTH_STATE'

export const loggedIn = (token) => ({type: LOGIN_SUCCESS, payload: { token }});
export const setState = (state) => ({type: SET_AUTH_STATE, payload: state});

