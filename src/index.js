import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import Divider from './components/routing/Divider.js';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, HashRouter, Route } from 'react-router-dom'
//CSS
import './assets/css/index.css';
import './assets/css/App.css';
import './assets/css/Home.css'
import './assets/css/AppMenu.css'
import './assets/css/Table.css'
import './assets/css/Relations.css';
// import './aboutusstyle/animate.css'
// // import './aboutusstyle/bootstrap.css'
// // import './aboutusstyle/bootstrap.min.css'
// import './aboutusstyle/style.css'


ReactDOM.render(
    <HashRouter>
        <Divider />
    </HashRouter>,
    document.getElementById('root'));
