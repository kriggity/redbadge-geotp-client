import React from 'react';
import { Typography, Box } from '@material-ui/core';
import TacoFancy from '../TacoFancy/TacoFancy';
import Jeopardy from '../james/jeopardyfetch';
import './Footer.css';
import Bored from './Bored'

export default function Footer() {
    return (
        <footer className="App-footer">
            <Typography component="div">
                <Box textAlign="center">
                    <p>&copy; TwoForTP 2020</p>
                </Box>
            </Typography>  
        <Bored />
            <Jeopardy />
            <TacoFancy />

        </footer>
    );
}