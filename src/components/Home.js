//import react
import React, { Component } from 'react';
//import react-router for setting different routers
import { Switch, Route } from 'react-router-dom'
//import redirect from react router to set the first page route
import { Redirect } from 'react-router'
//import drawer from material-ui for navigation
import Drawer from 'material-ui/Drawer';
// menu for drawer
import MenuItem from 'material-ui/MenuItem';
// button for drawer
import FlatButton from 'material-ui/FlatButton';
// import APP component
import App from './App.js';
// import Link from react router for redirection
import { Link } from 'react-router-dom';
// import fonticon for github icon
import FontIcon from 'material-ui/FontIcon';
// import css for Home component
import './homestyle.css'
// import panel from react-bootstrap
import { Panel } from 'react-bootstrap';
// import our logo from local folder
import graff from './graff.png'
//import materail ui 
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import button style from material ui for tryit button
import RaisedButton from 'material-ui/RaisedButton';


class Home extends Component {
  constructor(props) {
    super(props)
    // STATE FOR DRAER
    this.state = { open: false };
  }
  //METHOD FOR DRAWER (open or closed)
  handleToggle = () => this.setState({ open: !this.state.open });

  handleClose = () => this.setState({ open: false });


  render() {
    // drawer style
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
      <div className='mainpage'>

      {/* adding header, drawer button */}
        <div className='header'>
          <FlatButton className='navbutton'
            onClick={this.handleToggle}
            icon={<i className="material-icons">list</i>}
          />

         {/* adding drawer */}
          <Drawer
            docked={false}
            width={200}
            open={this.state.open}
            onRequestChange={(open) => this.setState({ open })}
          >

          {/* drawer menu with react router */}
            <div className ='drawertop'>GiraffQL</div>
            <Link to='/'><MenuItem onClick={this.handleClose}>Home</MenuItem></Link>
            <Link to ='/feature'><MenuItem onClick={this.handleClose}>Feature</MenuItem></Link>
            <Link to='/app'> <MenuItem onClick={this.handleClose}>App</MenuItem></Link>
            <Link to='/aboutus'><MenuItem onClick={this.handleClose}>About us</MenuItem></Link>
          </Drawer>

        {/* added github button */}
          <FlatButton className='gitbutton'
            href="https://github.com/giraffql/giraffql"
            icon={<i className="material-icons">account_circle</i>}
          />
      </div>

     {/* app name, logo, description */}
       <div className='mainimage'>
        <div className='coremain'>
          <img className ='image' src="https://github.com/giraffQL/giraffQL/blob/master/src/components/graff.png?raw=true" />
           <h1 className ='grafql'>GiraffQL</h1> 
        </div>

      {/* description */}
          <div className='maintext'>
            <p> A Set of React Components that Implement Google's Material Design DEMO</p>
          </div>
        </div>

      {/* short explanation about app */}
        <div className='second'>
          <p className='secondtxt'> ame about from our love of Reactl Design. We're currently using it on  </p>
          <p className='secondtxt'> Material-ogle's Material Design. We're currently using it on a project a] </p>
          <p className='secondtxt'> Material-UI came agn. We're currently using it on a project at Call-Em-All  </p>
          <div className ='tryit'>

      {/* tryit button */}
            <Link to='/app'><RaisedButton className='tryitbutton' label="try it" labelColor='green' /></Link>          
        </div>
        </div>

    {/* app features with picture with panel from react-bootstrap*/}
        <div className='third'>
          <Panel className='featurebox' header="Giraffql do this shit">
            <img src='https://d31v04zdn5vmni.cloudfront.net/blog/wp-content/uploads/2012/02/featured-image-snippets-1-690x362.png' />
          </Panel>
          <Panel className='featurebox' header='harry made it'>
            <img src='https://d31v04zdn5vmni.cloudfront.net/blog/wp-content/uploads/2012/02/featured-image-snippets-1-690x362.png' />
          </Panel>
          <Panel className='featurebox' header='scott made it'>
            <img src='https://d31v04zdn5vmni.cloudfront.net/blog/wp-content/uploads/2012/02/featured-image-snippets-1-690x362.png' />
          </Panel>
        </div>
        <div className='bottompart'>

        </div>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default Home;
