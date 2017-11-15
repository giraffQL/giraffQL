import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RoutedComponent from './RoutedComponent.js'


class Divider extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <RoutedComponent />
      </MuiThemeProvider >
    );
  }
}

export default Divider;
