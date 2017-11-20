import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom'
import FontIcon from 'material-ui/FontIcon';
import { Panel } from 'react-bootstrap';
import 'typeface-roboto'



class Aboutus extends Component {
  constructor(props) {
    super(props)
    this.state = { open: false };
  }
  handleToggle = () => this.setState({ open: !this.state.open });

  handleClose = () => this.setState({ open: false });


  render() {

    return (
      <div className='mainpage'>
        <div className='header'>
          <FlatButton className='navbutton'
            onClick={this.handleToggle}
            icon={<i class="material-icons">list</i>}
             />
          <Drawer
            docked={false}
            width={200}
            open={this.state.open}
            onRequestChange={(open) => this.setState({ open })}
          >
            <Link to='/'><MenuItem onClick={this.handleClose}>Home</MenuItem></Link>
            <MenuItem onClick={this.handleClose}>Feature</MenuItem>
            <Link to='/app'> <MenuItem onClick={this.handleClose}>App</MenuItem></Link>
            <MenuItem onClick={this.handleClose}>About us</MenuItem>
            <MenuItem onClick={this.handleClose}>Download</MenuItem>
          </Drawer>
          <FlatButton className ='gitbutton'
            href="https://github.com/callemall/giraffql"
            icon={<i class="material-icons">account_circle</i>}
            />
        </div>
        <div className='meetteam'>

        </div>
      </div>
    );
  }
}

export default Aboutus;
