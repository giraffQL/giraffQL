import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom'
import './homestyle.css'

class MenuComp extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    const {state, menuToggle, menuClose, fullscreenToggle} = this.props;

    const muiStyles = {
      appBar: {
        'background-color': '#9FA767',
        'line-height': '20px',
        color: '#fbe4a1',
        width: '100%',
        height: '58px',
        position: 'relative',
        'justify-content': 'space-between'
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
          <div style={muiStyles.appBar} className="header" title="Menu" onClick={menuToggle}>
            <FlatButton style={{color: 'white'}} className='navbutton' onClick={menuToggle} icon={<i class="material-icons">list</i>}
             />
          </div>
            <Drawer
              className='drawer'
              containerStyle={muiStyles.drawer}
              docked={false}
              width={200}
              open={state.open}
              onRequestChange={(open) => this.setState({open})}
            >
              <MenuItem style={muiStyles.menuItem} onClick={menuClose}>
                Exit
              </MenuItem>
              <Link to='/'>
                  <MenuItem style={muiStyles.menuItem} onClick={menuClose}>
                  Home
                  </MenuItem>
              </Link>
              <Link to='/feature'>
                  <MenuItem style={muiStyles.menuItem} onClick={menuClose}>Feature
                  </MenuItem>
              </Link>
              <Link to='/app'>
                  <MenuItem style={muiStyles.menuItem} onClick={menuClose}>
                  App
                  </MenuItem>
              </Link>
              <Link to='/aboutus'>
                  <MenuItem style={muiStyles.menuItem} onClick={menuClose}>About Us
                  </MenuItem>
              </Link>
              <Link to='/download'>
                  <MenuItem style={muiStyles.menuItem} onClick={menuClose}>Download
                  </MenuItem>
              </Link>
              <MenuItem style={muiStyles.menuItem} onClick={fullscreenToggle}>
                Fullscreen
              </MenuItem>
            </Drawer>
          </div>
      </MuiThemeProvider>
    )
  }
}

export default MenuComp;