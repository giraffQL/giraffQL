// IMPORT REACT
import React, { Component } from 'react';
// DRAWER FROM MATERIAL UI 
import Drawer from 'material-ui/Drawer';
// MENU FOR DRAWER
import MenuItem from 'material-ui/MenuItem';
// BUTTON FOR DRAWER
import FlatButton from 'material-ui/FlatButton';
// IMPORT APP
import App from './app/App.js'
// IMPORT LINK PROP FROM REACT ROUTER
import { Link } from 'react-router-dom'
// IMPORT ICON FOR GITHUB BUTTON
import FontIcon from 'material-ui/FontIcon';
// // CSS
// import '../../css/Home.css'
// PANEL FROM REACT-BOOTSTRAP (FEATURE PART)
import { Panel } from 'react-bootstrap';


class Feature extends Component {
  constructor(props) {
    super(props)
    // STATE FOR DRAWER
    this.state = { open: false };
  }
  
    // METHOD FOR DRAWER 
  handleToggle = () => this.setState({ open: !this.state.open });

  handleClose = () => this.setState({ open: false });


  render() {
    const muiStyles = {
      appBar: {
        'backgroundColor': '#2d2d2d',
        'lineHeight': '20px',
        'borderBottom': '3px solid #f6f6f7'
      },
      drawer: {
        'backgroundColor': '#2d2d2d',
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
      <div className='mainpage'>
        <div className='header' style={muiStyles.appBar}>
          <FlatButton style={muiStyles.menuIcon} className='navbutton'
            onClick={this.handleToggle}
            icon={<i className="material-icons">list</i>}
             />
          <Drawer className ='drawer'
            containerStyle={muiStyles.drawer}
            docked={false}
            width={200}
            open={this.state.open}
            onRequestChange={(open) => this.setState({ open })}
          >

          {/* DRAWER MENU WITH REACT ROUTER */}
            <div className ='drawertop'>GiraffQL</div>
            <Link to='/'><MenuItem style={muiStyles.menuItem} onClick={this.handleClose}>Home</MenuItem></Link>
            <Link to='/feature'><MenuItem style={muiStyles.menuItem} onClick={this.handleClose}>Feature</MenuItem></Link>
            <Link to='/app'> <MenuItem style={muiStyles.menuItem} onClick={this.handleClose}>App</MenuItem></Link>
            <Link to='/aboutus'><MenuItem style={muiStyles.menuItem} onClick={this.handleClose}>About us</MenuItem></Link>
            <MenuItem style={muiStyles.menuItem} onClick={this.handleClose}>Download</MenuItem>
          </Drawer>
          <FlatButton style={muiStyles.menuIcon} className ='gitbutton'
            href="https://github.com/callemall/giraffql"
            icon={<i class="material-icons">account_circle</i>}
            />
        </div>
        <section class="features" id="features">
    <div class="container">
      <h2 class="text-center">
          FEATURES
        </h2>

      <div className="row">
        <div className="feature-col col-lg-4 col-xs-12">
          <div className="card card-block text-center">
            <div>
              <div className="feature-icon">
                <span className="fa fa-rocket"></span>
              </div>
            </div>

            <div>
              <h3>
                  
                </h3>

              <p>
                Eque feugiat contentiones ei has. Id summo mundi explicari his, nec in maiorum scriptorem.
              </p>
            </div>
          </div>
        </div>

        <div className="feature-col col-lg-4 col-xs-12">
          <div className="card card-block text-center">
            <div>
              <div className="feature-icon">
                <span className="fa fa-envelope"></span>
              </div>
            </div>

            <div>
              <h3>
                  Responsive Layout
                </h3>

              <p>
                Eque feugiat contentiones ei has. Id summo mundi explicari his, nec in maiorum scriptorem.
              </p>
            </div>
          </div>
        </div>

        <div className="feature-col col-lg-4 col-xs-12">
          <div className="card card-block text-center">
            <div>
              <div className="feature-icon">
                <span className="fa fa-bell"></span>
              </div>
            </div>

            <div>
              <h3>
                  Innovative Ideas
                </h3>

              <p>
                Eque feugiat contentiones ei has. Id summo mundi explicari his, nec in maiorum scriptorem.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="feature-col col-lg-4 col-xs-12">
          <div className="card card-block text-center">
            <div>
              <div className="feature-icon">
                <span className="fa fa-database"></span>
              </div>
            </div>

            <div>
              <h3>
                  Good Documentation
                </h3>

              <p>
                Eque feugiat contentiones ei has. Id summo mundi explicari his, nec in maiorum scriptorem.
              </p>
            </div>
          </div>
        </div>

        <div className="feature-col col-lg-4 col-xs-12">
          <div className="card card-block text-center">
            <div>
              <div className="feature-icon">
                <span className="fa fa-cutlery"></span>
              </div>
            </div>

            <div>
              <h3>
                  Excellent Features
                </h3>

              <p>
                Eque feugiat contentiones ei has. Id summo mundi explicari his, nec in maiorum scriptorem.
              </p>
            </div>
          </div>
        </div>

        <div className="feature-col col-lg-4 col-xs-12">
          <div className="card card-block text-center">
            <div>
              <div className="feature-icon">
                <span className="fa fa-dashboard"></span>
              </div>
            </div>

            <div>
              <h3>
                  Retina Ready
                </h3>

              <p>
                Eque feugiat contentiones ei has. Id summo mundi explicari his, nec in maiorum scriptorem.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

      </div>
    );
  }
}

export default Feature;
