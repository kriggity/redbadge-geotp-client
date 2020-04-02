import React from 'react';
import { render } from '@testing-library/react';
import Login from '../Auth/Login';
import Signup from '../Auth/Signup';


export default class Navbar extends React.Component {
    render() {
        return (
            <div>
                <Signup />
                <Login />
            </div>
        )
    }
}