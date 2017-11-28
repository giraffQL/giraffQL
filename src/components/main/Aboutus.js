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
import FontIcon from 'material-ui/FontIcon';
// css for aboutus component
import '../../css/home.css'
// bootstrap css
// import './../../aboutusstyle/bootstrap.min.css'
// bootstrap css
// import './../../aboutusstyle/style.css'



class Aboutus extends Component {
  constructor(props) {
    super(props)
    this.state = { open: false };
  }
  // state for drawer (open or closed)

  handleToggle = () => this.setState({ open: !this.state.open });

  handleClose = () => this.setState({ open: false });


  render() {

    return (
      <div className='mainpage'>

      {/* header with drawer button and github button */}
        <div className='header'>
          <FlatButton className='navbutton'
            onClick={this.handleToggle}
            icon={<i className="material-icons">list</i>}
             />
          <Drawer className ='drawer'
            docked={false}
            width={200}
            open={this.state.open}
            onRequestChange={(open) => this.setState({ open })}
          >

          {/* drawer menu with react-router */}
            <div className ='drawertop'>GiraffQL</div>
            <Link to='/'><MenuItem onClick={this.handleClose}>Home</MenuItem></Link>
            <Link to='/feature'><MenuItem onClick={this.handleClose}>Feature</MenuItem></Link>
            <Link to='/app'> <MenuItem onClick={this.handleClose}>App</MenuItem></Link>
            <Link to='/aboutus'><MenuItem onClick={this.handleClose}>About us</MenuItem></Link>
          </Drawer>

          {/* github button */}
          <FlatButton className ='gitbutton'
            href="https://github.com/callemall/giraffql"
            icon={<i className="material-icons">account_circle</i>}
            />
        </div>

        {/* about us container */}
          <section id="about" className="home-section text-center">
            <div className="heading-about">
              <div className="container">
                <div className="row">
                  <div className="col-lg-8 col-lg-offset-2">
                  <h2>ABOUT US</h2>

                    <div className="wow bounceInDown" data-wow-delay="0.4s">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
        
              <div className="row">
                <div className="col-lg-2 col-lg-offset-5">
                </div>
              </div>
              <div className="row">

              {/* person 1 */}
                <div className="col-md-3">
                  <div className="wow bounceInUp" data-wow-delay="0.2s">
                    <div className="team boxed-grey">
                      <div className="inner">
                      <div className="avatar"><img src="https://github.com/giraffQL/giraffQL/blob/master/src/img/team/jelena.jpg?raw=true" alt="" className="img-responsive img-circle" /></div>

                        <h5>Jelena Gruica</h5>

                    {/* description */}
                        <p className="subtitle">hello worldr</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* person 2 */}
                <div className="col-md-3">
                  <div className="wow bounceInUp" data-wow-delay="0.5s">
                    <div className="team boxed-grey">
                      <div className="inner">
                        <h5>Scott Rosen</h5>

                        {/* description */}
                        <p className="subtitle">Ruby on Rails</p>
                        <div className="avatar"><img src="./../img/team/2.jpg" alt="" className="img-responsive img-circle" /></div>
        
                      </div>
                    </div>
                  </div>
                </div>

                {/* person 3 */}
                <div className="col-md-3">
                  <div className="wow bounceInUp" data-wow-delay="0.8s">
                    <div className="team boxed-grey">
                      <div className="inner">
                        <h5>Harry Cam</h5>

                        {/* description */}
                        <p className="subtitle">jQuery Ninja</p>
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
                        <h5>Woojun Choi</h5>

                        {/* description */}
                        <p className="subtitle">Typographer</p>
                        <div className="avatar"><img src="./../img/team/4.jpg" alt="" class="img-responsive img-circle" /></div>
        
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
