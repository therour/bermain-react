import { LOGOUT, SET_AUTH_STATE } from "../../actions/auth";

const defaultState = {
    user: null,
    token: localStorage.getItem('bearerToken')
}

export default function auth(state = defaultState, action) {
    switch (action.type) {
        case SET_AUTH_STATE:
            return {...state, user: action.payload.user, token: action.payload.token}
        case LOGOUT:
            return {...state, user: null, token: null}
        default: 
            return state;
    }
}