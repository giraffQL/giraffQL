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
import App from './app/App.js'
// import Link from react router for redirection
import { Link } from 'react-router-dom';
// import fonticon for github icon
import FontIcon from 'material-ui/FontIcon';
// import css for Home component
// import '../../css/home.css'
// import panel from react-bootstrap
import { Panel } from 'react-bootstrap';
//import materail ui 
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import button style from material ui for tryit button
import RaisedButton from 'material-ui/RaisedButton';
import Background from '../../assets/background.jpg'
import Logo from '../../assets/logo.png'

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
        'backgroundColor': 'rgba(0,0,0,0)',
        'lineHeight': '20px'
        // 'borderBottom': '3px solid #f6f6f7'
      },
      drawer: {
        'backgroundColor': 'rgb(45,45,45)',
      },
      menuItem: {
        'color': '#fdd217',
        'fontSize': '16px',
        'textAlign': 'center'
      },
      menuIcon: {
        'color': '#fdd217' /*'#FFD300'*/
      }
    }

    return (
      <MuiThemeProvider>
      <div className='mainpage'>
        <div className='header' style={muiStyles.appBar}>
          <FlatButton className='navbutton'
            onClick={this.handleToggle}
            icon={<i className="material-icons">list</i>}
          />

         {/* adding drawer */}
          <Drawer
            containerStyle={muiStyles.drawer}
            docked={false}
            width={200}
            open={this.state.open}
            onRequestChange={(open) => this.setState({ open })}
          >

          {/* drawer menu with react router */}
            <div className ='drawertop'>GiraffQL</div>
            <Link to='/'><MenuItem style={muiStyles.menuItem} onClick={this.handleClose}>Home</MenuItem></Link>
            <Link to='/feature'><MenuItem style={muiStyles.menuItem} onClick={this.handleClose}>Feature</MenuItem></Link>
            <Link to='/app'> <MenuItem style={muiStyles.menuItem} onClick={this.handleClose}>App</MenuItem></Link>
            <Link to='/aboutus'><MenuItem style={muiStyles.menuItem} onClick={this.handleClose}>About us</MenuItem></Link>
          </Drawer>

        {/* added github button */}
          <FlatButton className='gitbutton'
            href="https://github.com/giraffql/giraffql"
            icon={<i className="material-icons">account_circle</i>}
          />
      </div>

     {/* app name, logo, description */}
       <div className='mainimage'>
       <img className='background' src = {Background}/>
        <div className='coremain'>
           <h1 className ='grafql'> <img className ='logo' src={Logo} /> GiraffQL</h1> <br/>
           <div className='maintext'>
            <p> A Set of React Components that Implement Google's Material Design DEMO</p>
          </div><br/>
          <div className ='tryit'>

      {/* tryit button */}
            <Link to='/app'><button className='tryitbutton'>TRY IT</button></Link>          
        </div>
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
