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
// CSS
import '../../css/home.css'
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

    return (
      <div className='mainpage'>

      {/* header and drawer button */}
        <div className='header'>
          <FlatButton className='navbutton'
            onClick={this.handleToggle}
            icon={<i className="material-icons">list</i>}
          />

         {/* DRAWER */}
          <Drawer
            docked={false}
            width={200}
            open={this.state.open}
            onRequestChange={(open) => this.setState({ open })}
          >

          {/* DRAWER MENU WITH REACT ROUTER */}
            <div className ='drawertop'>GiraffQL</div>
            <Link to='/'><MenuItem onClick={this.handleClose}>Home</MenuItem></Link>
            <Link to ='/feature'><MenuItem onClick={this.handleClose}>Feature</MenuItem></Link>
            <Link to='/app'> <MenuItem onClick={this.handleClose}>App</MenuItem></Link>
            <Link to='/aboutus'><MenuItem onClick={this.handleClose}>About us</MenuItem></Link>
          </Drawer>

        {/* GITHUB BUTTON */}
          <FlatButton className='gitbutton'
            href="https://github.com/giraffql/giraffql"
            icon={<i className="material-icons">account_circle</i>}
          />
      </div>


        <section className="features" id="features">
    <div className="container">
      <h2 className="text-center">
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
                  Custom Design
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
