import React from 'react';
import './Footer.css';
import Jeopardy from '../james/jeopardyfetch';

export default function Footer() {
    return (
        <footer className="App-footer">
            <p>&copy; TwoForTP 2020</p>
            <Jeopardy />
        </footer>
    );
}