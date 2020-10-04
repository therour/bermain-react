import { put, takeLatest, call } from "redux-saga/effects";
import { setState, LOGIN_SUCCESS } from "../../actions/auth";

export function* watchUserAuthentication() {
    yield takeLatest(LOGIN_SUCCESS, fetchAuthenticatedUser)
}

function* fetchAuthenticatedUser(action) {
    const response = yield call(getAuthenticatedUser, action.payload.token);
    console.log(response, action);
    yield put(setState({ user: response.data, token: action.payload.token}));
}

function getAuthenticatedUser(bearerToken) {
    return new Promise((resolve, reject) => {
        return resolve({
            data: {
                name: 'John Doe'
            }
        })
    });
}

