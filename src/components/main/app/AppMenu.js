import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton';
// REACT-BOOTSTRAP
import { FormControl, Button, ButtonGroup, Nav, Tooltip, OverlayTrigger } from 'react-bootstrap';


class MenuComp extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { state, menuToggle, menuClose, onRequestChange, fullscreenToggle, onAddTable, deleteAllTables, saveTextAsFile, submitSchemaCode } = this.props;

    const muiStyles = {
      appBar: {
        'backgroundColor': 'rgb(51,51,51)',
        'lineHeight': '20px',
        'borderBottom': '3px solid white'
      },
      drawer: {
        'backgroundColor': 'rgb(51,51,51)',
      },
      menuItem: {
        'color': '#FFD300',
        'fontSize': '16px',
        'textAlign': 'left'
      },
      download: {
        'color': '#FFD300',
        'fontSize': '16px',
        'textAlign': 'left',
        'borderBottom': '1px dashed #FFD300'
      },
      menuIcon: {
        'color': '#FFD300'
      }
    }
    const tooltipCT = (
      <Tooltip id="tooltip">Create Table</Tooltip>
    )
    const tooltipCA = (
      <Tooltip id="tooltip">Clear All</Tooltip>
    )
    const tooltipTest = (
      <Tooltip id="tooltip"> Test schema with GraphiQL</Tooltip>
    )
    const tooltipSave = (
      <Tooltip id="tooltip"> Save express schema.js file </Tooltip>
    )
    return (
      <div>
        <div style={muiStyles.appBar} className="appBar">
          <FlatButton style={muiStyles.menuIcon} className='navbutton'
            onClick={menuToggle}
            icon={<i className="material-icons">list</i>}
          />

          <div className="toolPanel">
            <OverlayTrigger placement="left" overlay={tooltipCT}>
              <Button id="createTableBtn" className="addAndClearBtns" bsSize="large" onClick={onAddTable}>
                +
                 </Button>
            </OverlayTrigger>
            <OverlayTrigger placement="bottom" overlay={tooltipCA}>
              <Button id="clearBtn" className="addAndClearBtns" bsSize="large" onClick={deleteAllTables}>
                x
                 </Button>
            </OverlayTrigger>
            <OverlayTrigger placement="bottom" overlay={tooltipTest}>
            <button className="test" onClick={submitSchemaCode}>
              TEST SCHEMA
              </button>
            </OverlayTrigger>
            <OverlayTrigger placement="bottom" overlay={tooltipSave}>
            <button className="save" onClick={saveTextAsFile}>
              SAVE SCHEMA
            </button>
            </OverlayTrigger>
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