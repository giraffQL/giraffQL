// import react
import React, { Component } from 'react';
// import few things for react-router
import { BrowserRouter, Route } from 'react-router-dom'
// import material ui provier
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import routedcomponent component
import RoutedComponent from './RoutedComponent.js'


class Divider extends Component {
  render() {
    return (
      //wrap routedcomponent component with material ui provider
      <MuiThemeProvider>
        <RoutedComponent />
      </MuiThemeProvider >
    );
  }
}

export default Divider;
