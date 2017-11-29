import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import { Link } from 'react-router-dom'
import FontIcon from 'material-ui/FontIcon';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import { Panel } from 'react-bootstrap';
import 'typeface-roboto'
// COMPONENTS
import App from './app/App.js';
//STATIC FILES
import graff from '../../assets/graff.png'
import main from '../../assets/mainimage.png'
import Octocat from '../GitHub-Mark-32px.png';



class Home extends Component {
  constructor(props) {
    super(props)
    this.state = { open: false };
  }
  handleToggle = () => this.setState({ open: !this.state.open });

  handleClose = () => this.setState({ open: false });


  render() {
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
          <Drawer
            containerStyle={muiStyles.drawer}
            docked={false}
            width={200}
            open={this.state.open}
            onRequestChange={(open) => this.setState({ open })}
          >

            <div className ='drawertop'>GiraffQL</div>
            <Link to='/'><MenuItem style={muiStyles.menuItem} onClick={this.handleClose}>Home</MenuItem></Link>
            <Link to='/feature'><MenuItem style={muiStyles.menuItem} onClick={this.handleClose}>Feature</MenuItem></Link>
            <Link to='/app'> <MenuItem style={muiStyles.menuItem} onClick={this.handleClose}>App</MenuItem></Link>
            <Link to='/aboutus'><MenuItem style={muiStyles.menuItem} onClick={this.handleClose}>About us</MenuItem></Link>
          </Drawer>

          <FlatButton className='gitbutton'
            href="https://github.com/giraffql/giraffql"
            icon={<i className="material-icons">account_circle</i>}
          />
      </div>
       <div className='mainimage'>
        <div className='coremain'>
          <img className ='image' src={graff} />
           <h1 className ='grafql'>GiraffQL</h1>
          {/* <FlatButton className='gitbutton'
            href="https://github.com/giraffql/giraffql"
            // icon={<i class="material-icons">account_circle</i>}
          /> */}
        </div>
          <div className='maintext'>
            <p> AAAAA Set of React Components that Implement Google's Material Design DEMO</p>
          </div>
        </div>
        <div className='second'>
          <p className='secondtxt'> ame about from our love of Reactl Design. We're currently using it on  </p>
          <p className='secondtxt'> Material-ogle's Material Design. We're currently using it on a project a] </p>
          <p className='secondtxt'> Material-UI came agn. We're currently using it on a project at Call-Em-All  </p>
          <div className ='tryit'>
            {/* <p className ='trytext'>Try it</p> */}
            <Link to='/app'><RaisedButton className='tryitbutton' label="try it" labelColor='green' /></Link>
        </div>
        </div>
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
