// REACT ROUTER
import { Switch, Route } from 'react-router-dom'
// REACT
import React, { Component,Redirect } from 'react';
// REACT-DOM
import { render } from 'react-dom';
// REACT-DOM
import ReactDOM from 'react-dom';
//COMPONENTS
import App from '../main/app/App.js'
import Home from '../main/Home.js'
import Aboutus from '../main/Aboutus.js'


class RoutedComponent extends Component {

  render() {
    return (
      <div id='routed-component'>
      {/* SET UP ROUTE FOR EACH COMPONENT */}
         <Switch>
         <Route exact path='/' component={Home}/>
         <Route exact path='/app' component={App}/>
         <Route exact path='/aboutus' component={Aboutus}/>

         {/* DEFAULT SETTING = HOME */}
         <Redirect to='/'/>

       </Switch>
     </div>
    )
  }
}
export default RoutedComponent;