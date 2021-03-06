// import react
import React, { Component } from 'react';
// import drawer from react-bootstrap
import Drawer from 'material-ui/Drawer';
// for drawer 
import MenuItem from 'material-ui/MenuItem';
// for drawer naviagation
import FlatButton from 'material-ui/FlatButton';
// import app component
import App from './app/App.js'
// import Link 
import { Link } from 'react-router-dom'
// for github button
import FontIcon from 'material-ui/FontIcon'
import Woojun from '../../img/team/woojun.jpg'
import Jelena from '../../img/team/jelena.jpg'
import Harry from '../../img/team/harry.jpg'
import Scott from '../../img/team/scott.jpg'
import Style from '../../css/About.css'

class Aboutus extends Component {
  constructor(props) {
    super(props)
    this.state = { open: false };
  }
  // state for drawer (open or closed)

  handleToggle = () => this.setState({ open: !this.state.open });

  handleClose = () => this.setState({ open: false });


  render() {
    const muiStyles = {
      appBar: {
        'backgroundColor': 'black',
        'lineHeight': '20px',
        'borderBottom': '3px solid #f6f6f7'
      },
      drawer: {
        'backgroundColor': 'black',
      },
      menuItem: {
        'color': '#fdd217',
        'fontSize': '16px',
        'textAlign': 'center',
        'margin-top': '10px'
      },
      download: {
        'color': '#fdd217',
        'fontSize': '16px',
        'textAlign': 'left',
        'borderBottom': '1px dashed #fdd217'
      },
      menuIcon: {
        'color': '#fdd217' /*'#FFD300'*/
      }
    }

    return (
      <div className='mainpage'>
        <div className='header' style={muiStyles.appBar}>
          <FlatButton className='navbutton'
            style={muiStyles.menuIcon}
            onClick={this.handleToggle}
            icon={<i className="material-icons">list</i>}
          />
          <Drawer className='drawer'
            containerStyle={muiStyles.drawer}
            docked={false}
            width={200}
            open={this.state.open}
            onRequestChange={(open) => this.setState({ open })}
          >

            {/* drawer menu with react-router */}
            <div className='drawertop'>GiraffQL</div>
            <Link to='/'><MenuItem style={muiStyles.menuItem} onClick={this.handleClose}>Home</MenuItem></Link>
            <Link to='/app'> <MenuItem style={muiStyles.menuItem} onClick={this.handleClose}>App</MenuItem></Link>
            <Link to='/aboutus'><MenuItem style={muiStyles.menuItem} onClick={this.handleClose}>About us</MenuItem></Link>
          </Drawer>
          <FlatButton style={muiStyles.menuIcon} className='gitbutton'
            href="https://github.com/callemall/giraffql"
            icon={<i className="material-icons">account_circle</i>}
          />
        </div>

        {/* about us container */}
        <section id="about" className="home-section text-center">
          <div className="heading-about">
            <div className="container">
                <div className='aboutheader'>
                  <h4>OUR TEAM</h4>
                </div>
            </div>
          </div>
          <div className="container">

              <div className="col-lg-2 col-lg-offset-5">
              </div>
            <div className="row">

              {/* person 1 */}
              <div className="col-md-3">
                <div className="wow bounceInUp" data-wow-delay="0.2s">
                  <div className="team boxed-grey">
                    <div className="inner">
                      <div className="avatar"><img src={Jelena} alt="" className="img-responsive img-circle" /></div>

                      <h5 className='abouth5'>Jelena Gruica</h5>

                      {/* description */}
                      <a href="https://www.linkedin.com/in/jelena-gruica/">Linkedin</a>/
                        <a href="https://github.com/jgruica">GitHub</a>
                      <p className="subtitle">Software Engineer</p>

                    </div>
                  </div>
                </div>
              </div>

              {/* person 2 */}
              <div className="col-md-3">
                <div className="wow bounceInUp" data-wow-delay="0.5s">
                  <div className="team boxed-grey">
                    <div className="inner">
                    <div className="avatar"><img src={Scott} alt="" className="img-responsive img-circle" /></div>

                      <h5 className='abouth5'>Scott Rosen</h5>

                      {/* description */}
                      <a href="https://www.linkedin.com/in/scott-rosen/">Linkedin</a>/
                        <a href="https://github.com/scottrosen14">GitHub</a>
                      <p className="subtitle">Software Engineer</p>

                    </div>
                  </div>
                </div>
              </div>

              {/* person 3 */}
              <div className="col-md-3">
                <div className="wow bounceInUp" data-wow-delay="0.8s">
                  <div className="team boxed-grey">
                    <div className="inner">
                    <div className="avatar"><img src={Harry} alt="" className="img-responsive img-circle" /></div>

                      <h5 className='abouth5'>Harry Cam</h5>

                      {/* description */}
                      <a href="https://www.linkedin.com/in/harry-cam/">Linkedin</a>/
                        <a href="https://github.com/hcam05">GitHub</a>
                      <p className="subtitle">Software Engineer</p>
                      <div className="avatar"><img src="./../img/team/3.jpg" alt="" className="img-responsive img-circle" /></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* person 4 */}
              <div className="col-md-3">
                <div className="wow bounceInUp" data-wow-delay="1s">
                  <div className="team boxed-grey">
                    <div className="inner">
                    <div className="avatar"><img src={Woojun} alt="" className="img-responsive img-circle" /></div>
                      <h5 className='abouth5'>Woojun Choi</h5>
                        
                      {/* description */}
                      <a href="https://www.linkedin.com/in/woojunchoi/">Linkedin</a>/
                        <a href="https://github.com/woojunchoi">GitHub</a>
                      <p className="subtitle">Software Engineer</p>

                    </div>
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

export default Aboutus;
