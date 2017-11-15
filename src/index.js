import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Divider from './components/Divider.js';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom'


ReactDOM.render(
    <BrowserRouter>
        <Divider />
    </BrowserRouter>, 
    document.getElementById('root'));
registerServiceWorker();
