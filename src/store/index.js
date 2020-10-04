import { createStore, combineReducers, applyMiddleware } from 'redux'
import auth from './reducers/auth';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/root'

const reducers = combineReducers({
    auth
});

const sagaMiddleware = createSagaMiddleware();
const middlewares = applyMiddleware(
    sagaMiddleware
)

const store = createStore(reducers, middlewares)
sagaMiddleware.run(rootSaga)

export default store;