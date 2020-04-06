import React from 'react';
import './Navbar.css';

class Sitebar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <header className="App-header">
                <ul>
                    <li>Home</li>
                    <li>Sign In</li>
                    <li>Create Account</li>
                    <li>My Account</li>
                    <li>Sign Out</li>
                </ul>
            </header>
        );
    }
}

export default Sitebar;