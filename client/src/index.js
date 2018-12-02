import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {MuiPickersUtilsProvider} from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import './index.css';
import App from './App/App';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';

const theme = createMuiTheme({
    palette: {
        primary: {main: blue[500]}, // Purple and green play nicely together.
        secondary: {main: red[700]}, // This is just green.A700 as hex.
    },
});



render((
    <MuiThemeProvider theme={theme}>
        <BrowserRouter>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <App/>
            </MuiPickersUtilsProvider>
        </BrowserRouter>
    </MuiThemeProvider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can changef
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
/*serviceWorker.unregister();*/
