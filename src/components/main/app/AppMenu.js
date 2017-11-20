import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton';
// REACT-BOOTSTRAP
import { FormControl, Button, ButtonGroup, Nav } from 'react-bootstrap';


class MenuComp extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    const {state, menuToggle, menuClose, onRequestChange, fullscreenToggle, onAddTable, deleteAllTables, saveTextAsFile} = this.props;

    const muiStyles = {
      appBar: {
        'background-color': 'rgb(51,51,51)',
        'line-height': '20px',
        'border-bottom': '3px solid white'
      },
      drawer: {
        'background-color': 'rgb(51,51,51)',
      },
      menuItem: {
        'color': '#FFD300',
        'font-size': '16px',
        'text-align': 'left'
      },
      download: {
        'color': '#FFD300',
        'font-size': '16px',
        'text-align': 'left',
        'border-bottom': '1px dashed #FFD300'
      },
      menuIcon: {
        color: '#FFD300'
      }
    }
    return (
      <div>
          <div style={muiStyles.appBar} className="appBar">
            <FlatButton style={muiStyles.menuIcon} className='navbutton'
              onClick={menuToggle}
              icon={<i class="material-icons">list</i>}
               />
               <div className="toolPanel">
                 <Button id="createTableBtn" className="displayBtn" bsSize="large" onClick={onAddTable}>
                  +
                 </Button>
                 <Button id="clearBtn" className="displayBtn" bsSize="large" onClick={deleteAllTables}>
                  x
                 </Button>
                 <button className="save" onClick={saveTextAsFile}>
                  SAVE SCHEMA CODE
                 </button>
               </div>
          </div>
            <Drawer
              className='drawer'
              containerStyle={muiStyles.drawer}
              docked={false}
              width={200}
              open={state.open}
              onRequestChange={onRequestChange}
            >
              <Link to="/">
                <MenuItem style={muiStyles.menuItem} onClick={menuClose}>
                  Home
                </MenuItem>
              </Link>
              <Link to="/feature">
                <MenuItem style={muiStyles.menuItem} onClick={menuClose}>
                  Feature
                </MenuItem>
              </Link>
              <Link to="/app">
                <MenuItem style={muiStyles.menuItem} onClick={menuClose}>
                  App
                </MenuItem>
              </Link>
              <Link to="/aboutus">
                <MenuItem style={muiStyles.menuItem} onClick={menuClose}>
                  About
                </MenuItem>
              </Link>
              <Link to="/download">
                <MenuItem style={muiStyles.download} onClick={menuClose}>
                  Download
                </MenuItem>
              </Link>
              <MenuItem style={muiStyles.menuItem} onClick={fullscreenToggle}>
                Fullscreen
              </MenuItem>
            </Drawer>
          </div>
    )
  }
}

export default MenuComp;