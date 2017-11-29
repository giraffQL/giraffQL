import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Divider from './components/routing/Divider.js';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, HashRouter, Route } from 'react-router-dom'
//CSS
import './css/index.css';
import './css/App.css';
import './css/Home.css'
import './css/AppMenu.css'
import './css/Table.css'
import './css/Relations.css';
// import './aboutusstyle/animate.css'
// // import './aboutusstyle/bootstrap.css' 
// // import './aboutusstyle/bootstrap.min.css'
// import './aboutusstyle/style.css'


ReactDOM.render(
    <HashRouter>
        <Divider />
    </HashRouter>,
    document.getElementById('root'));
