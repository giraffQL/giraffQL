// REACT ROUTER
import { Switch, Route } from 'react-router-dom'
// REACT
import React, { Component } from 'react';
// REACT-DOM
import { render } from 'react-dom';
// REACT-DOM
import ReactDOM from 'react-dom';
// IMPORT ABOUTUS COMPONENT
import Aboutus from '../main/Aboutus.js'
// IMPORT FEATURE COMPONENT
import Feature from '../main/Feature.js'
// IMPORT HOME COMPONENT
import Home from '../main/Home.js'
// IMPORT APP COMPONENT
import App from '../main/app/App.js'
// IMPORT REACT-ROUTER REDIRECT
import { Redirect } from 'react-router'


class RoutedComponent extends Component {

  render() {
    return (
      <div id='routed-component'>
      {/* SET UP ROUTE FOR EACH COMPONENT */}
         <Switch>
         <Route exact path='/' component={Home}/>
         <Route exact path='/app' component={App}/>
         <Route exact path='/aboutus' component={Aboutus}/>
         <Route exact path='/feature' component={Feature}/>

         {/* DEFAULT SETTING = HOME */}
         <Redirect to='/'/>

       </Switch>
     </div>
    )
  }
}
export default RoutedComponent;