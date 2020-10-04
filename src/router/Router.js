import React, { Suspense, lazy } from 'react'
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Spinner } from 'reactstrap'

const HOME_PAGE_URL = '/';
const LOGIN_PAGE_URL = '/login';

const Login = lazy(() => import('../pages/Login'));
const Dashboard = lazy(() => import('../pages/Dashboard'));

function AppRouter() {
    return (
        <Router>
            <Suspense fallback={<Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />}>

            <Switch>
                <GuestRoute path={LOGIN_PAGE_URL} exact component={Login} />
                <AuthRoute path="/" component={Dashboard} />
            </Switch>

            </Suspense>
        </Router>
    )
}

function GuestRoute(props) {
    const auth = useSelector(state => state.auth);

    if (auth.user === null) {
        return <Route {...props}/>
    }

    return <Redirect to={HOME_PAGE_URL}/>
}

function AuthRoute(props) {
    const auth = useSelector(state => state.auth);

    if (auth.user !== null) {
        return <Route {...props}/>
    }

    return <Redirect to={LOGIN_PAGE_URL}/>
}

export default AppRouter
