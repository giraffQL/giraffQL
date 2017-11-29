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
// import panel from react-bootstrap
import { Panel } from 'react-bootstrap';
//import materail ui 
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import button style from material ui for tryit button
import RaisedButton from 'material-ui/RaisedButton';
import Background from '../../assets/background.jpg'
import Logo from '../../assets/logo.png'
import Relation from '../../img/works/giraffQL-relation.gif'
import Intro from '../../img/works/giraffQL-graphiql.gif'
import Tablecreation from '../../img/works/giraffQL-table-creation.gif'
import Tablecreationlarge from '../../img/works/giraffQL-table-creation-large.gif'
import Relationlarge from '../../img/works/giraffQL-realtion-large.gif'
import Introlarge from '../../img/works/giraffQL-graphiql-large.gif'
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class Home extends Component {
  constructor(props) {
    super(props)
    // STATE FOR DRAER
    this.state = { 
      open: false ,
      modalIsOpen: false,
      picnum:0
    };
  }
  //METHOD FOR DRAWER (open or closed)
  handleToggle = () => this.setState({ open: !this.state.open });

  handleClose = () => this.setState({ open: false });

  // openModal = () => {
  //   this.setState({modalIsOpen: true});
  // }
  openone = () => {
    this.setState(
      {picnum:0,
      modalIsOpen: true})
  }
  opentwo = () => {
    this.setState(
      {picnum:1,
      modalIsOpen: true})
  }
  openthree = () => {
    this.setState(
      {picnum:2,
      modalIsOpen: true})
  }
  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

  render() {

    let images = [Tablecreationlarge, Relationlarge, Introlarge]
    // drawer style
    const muiStyles = {
      appBar: {
        'backgroundColor': 'rgba(0,0,0,0)',
        'lineHeight': '20px'
      },
      drawer: {
        'backgroundColor': 'rgb(45,45,45)',
      },
      menuItem: {
        'color': '#fdd217',
        'fontSize': '16px',
        'font-weight': '400',
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
            <div className ='drawertop' style={{'font-weight': 'bold'}}>GiraffQL</div>
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
            <p> Interactive GraphQL exploration tool built with React</p>
          </div><br/>
          <div className ='tryit'>

      {/* tryit button */}
            <Link to='/app'><button className='tryitbutton'>TRY IT</button></Link>          
        </div>
        </div>
        </div>


    {/* app features with picture with panel from react-bootstrap*/}
        <div className='third'>
          <Panel className='featurebox' header={<p className='panelheader'>CREATE TABLE</p>}>
            <img className='panelcontent' onClick={this.openone} src={Tablecreation} />
            <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <img src={images[this.state.picnum]}/>
          <p>blah blah</p>

        </Modal>
          </Panel>
          <Panel className='featurebox' header={<p className='panelheader'>CREATE REALATION</p>}>
            <img className='panelcontent'src={Relation} onClick={this.opentwo} />
          </Panel>
          <Panel className='featurebox' header={<p className='panelheader'>GRAPHIQL INTEGRATION</p>}>
            <img className='panelcontent' src={Intro} onClick={this.openthree} />
          </Panel>
        </div>
        <div className='bottompart'>
            We'd love to hear your comments and suggestions. <br/>
            You can find us on<a href="https://github.com/giraffQL"> GitHub</a>.
        </div>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default Home;
