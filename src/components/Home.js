import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import App from './App.js'
import { Link } from 'react-router-dom'
import FontIcon from 'material-ui/FontIcon';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import './homestyle.css'
import { Panel } from 'react-bootstrap';
import graff from './graff.png'
import main from './mainimage.png'
import 'typeface-roboto'



class Home extends Component {
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
            <Link to='/aboutus'><MenuItem onClick={this.handleClose}>About us</MenuItem></Link>
            <MenuItem onClick={this.handleClose}>Download</MenuItem>
          </Drawer>
          <FlatButton className ='gitbutton'
            href="https://github.com/callemall/giraffql"
            icon={<i class="material-icons">account_circle</i>}
            />
        </div>
       <div className='mainimage' style={{backgroundImage: `url(${main})`}}>
        <div className='coremain'>
          <img className ='image' src={graff} />
           <h1 className ='grafql'>GiraffeQL</h1> 
        </div>
        <div className ='maintext'>
          <p> A Set of React Components that Implement Google's Material Design DEMO</p> 
        </div>
        </div>
        <div className ='second'>
          <p className='secondtxt'> ame about from our love of Reactl Design. We're currently using it on  </p>
          <p className='secondtxt'> Material-ogle's Material Design. We're currently using it on a project a] </p>
          <p className='secondtxt'> Material-UI came agn. We're currently using it on a project at Call-Em-All  </p>

        </div>
        <div className = 'third'>
      <Panel className ='featurebox' header="Giraffql do this shit">
        <img src='https://d31v04zdn5vmni.cloudfront.net/blog/wp-content/uploads/2012/02/featured-image-snippets-1-690x362.png'/>
      </Panel>
      <Panel className ='featurebox' header='harry made it'>
        <img src='https://d31v04zdn5vmni.cloudfront.net/blog/wp-content/uploads/2012/02/featured-image-snippets-1-690x362.png'/>
      </Panel>
      <Panel className ='featurebox' header='scott made it'>
        <img src ='https://d31v04zdn5vmni.cloudfront.net/blog/wp-content/uploads/2012/02/featured-image-snippets-1-690x362.png'/>
      </Panel>
      </div>
      <div className ='bottompart'>

      </div>
      </div>
    );
  }
}

export default Home;
