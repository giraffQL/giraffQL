import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';


class MenuComp extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    const {state, menuToggle, menuClose, fullscreenToggle} = this.props;

    const muiStyles = {
      appBar: {
        'background-color': '#9FA767',
        'border-bottom': '4px solid white',
        'line-height': '20px',
        color: '#fbe4a1'
      },
      drawer: {
        'background-color': '#9FA767',
        'color': 'white'
      },
      menuItem: {
        'color': 'white',
        'font-size': '20px'
      }
    }
    return (
      <MuiThemeProvider>
      <div>
        {console.log(' mui this is working')}
          <AppBar style={muiStyles.appBar} className="appBar" title="Menu" onClick={menuToggle}></AppBar>
            <Drawer
              className='drawer'
              containerStyle={muiStyles.drawer}
              docked={false}
              width={200}
              open={state.open}
              onRequestChange={(open) => this.setState({open})}
            >
              <MenuItem style={muiStyles.menuItem} onClick={menuClose}>EXIT</MenuItem>
              <MenuItem style={muiStyles.menuItem} onClick={menuClose}>HOME</MenuItem>
              <MenuItem style={muiStyles.menuItem} onClick={menuClose}>APP</MenuItem>
              <MenuItem style={muiStyles.menuItem} onClick={menuClose}>ABOUT</MenuItem>
              <MenuItem style={muiStyles.menuItem} onClick={fullscreenToggle}>
                VIEW FULLSCREEN
              </MenuItem>
            </Drawer>
          </div>
      </MuiThemeProvider>
    )
  }
}

export default MenuComp;