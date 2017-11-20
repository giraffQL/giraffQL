import { Switch, Route } from 'react-router-dom'
import React, { Component } from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import App from './App.js'
import Home from './Home.js'
import Aboutus from './Aboutus.js'
import Feature from './Feature.js'


class RoutedComponent extends Component {
  
  render() {
    return (
      <div id='routed-component'>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/app' component={App}/>
          <Route exact path='/aboutus' component={Aboutus}/>
          <Route exact path='/feature' component={Feature}/>
        </Switch>
      </div>
    )
  }
}
export default RoutedComponent;