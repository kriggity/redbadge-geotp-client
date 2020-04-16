import React from 'react';
import './Footer.css';
import Jeopardy from '../james/jeopardyfetch';
import TacoFancy from '../TacoFancy/TacoFancy';

export default function Footer() {
    return (
        <footer className="App-footer">
            <p>&copy; TwoForTP 2020</p>
            <Jeopardy />
            <TacoFancy />
        </footer>
    );
}