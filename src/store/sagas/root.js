import { fork } from 'redux-saga/effects'
import { watchUserAuthentication } from './auth'

export default function* rootSaga() {
    yield fork(watchUserAuthentication);
}