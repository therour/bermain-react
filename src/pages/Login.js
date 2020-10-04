import React from 'react'
import { useDispatch } from 'react-redux'
import { Button } from 'reactstrap'
import { loggedIn } from '../actions/auth'


function Login() {
    const dispatch = useDispatch()

    function handleLogin() {
        setTimeout(function () {
            dispatch(loggedIn('thisisbearertoken'));
        },1000);
    }

    return (
        <div>
            <Button color="primary" onClick={handleLogin}>Login</Button>
        </div>
    )
}

export default Login
