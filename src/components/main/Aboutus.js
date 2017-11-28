import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom'
import FontIcon from 'material-ui/FontIcon';
import { Panel } from 'react-bootstrap';
import 'typeface-roboto'
// import './../aboutusstyle/animate.css'
// import './../aboutusstyle/bootstrap.css'
// import './../aboutusstyle/bootstrap.min.css'
// import './../aboutusstyle/style.css'
import picone from '../../img/team/jelena.jpg'


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
          <Drawer className ='drawer'
            docked={false}
            width={200}
            open={this.state.open}
            onRequestChange={(open) => this.setState({ open })}
          >
            <div className ='drawertop'>GiraffQL</div>
            <Link to='/'><MenuItem onClick={this.handleClose}>Home</MenuItem></Link>
            <Link to='/feature'><MenuItem onClick={this.handleClose}>Feature</MenuItem></Link>
            <Link to='/app'> <MenuItem onClick={this.handleClose}>App</MenuItem></Link>
            <Link to='/aboutus'><MenuItem onClick={this.handleClose}>About us</MenuItem></Link>
          </Drawer>
          <FlatButton className ='gitbutton'
            href="https://github.com/callemall/giraffql"
            icon={<i class="material-icons">account_circle</i>}
            />
        </div>

        <div className='meetteam'>

        </div>

          <section id="about" class="home-section text-center">
            <div class="heading-about">
              <div class="container">
                <div class="row">
                  <div class="col-lg-8 col-lg-offset-2">
                  <h2>ABOUT US</h2>

                    <div class="wow bounceInDown" data-wow-delay="0.4s">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="container">

              <div class="row">
                <div class="col-lg-2 col-lg-offset-5">
                </div>
              </div>
              <div class="row">
                <div class="col-md-3">
                  <div class="wow bounceInUp" data-wow-delay="0.2s">
                    <div class="team boxed-grey">
                      <div class="inner">
                      <div class="avatar"><img src={picone} alt="" class="img-responsive img-circle" /></div>

                        <h5>Jelena Gruica</h5>
                        <p class="subtitle">hello worldr</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="wow bounceInUp" data-wow-delay="0.5s">
                    <div class="team boxed-grey">
                      <div class="inner">
                        <h5>Scott Rosen</h5>
                        <p class="subtitle">Ruby on Rails</p>
                        <div class="avatar"><img src="./../img/team/2.jpg" alt="" class="img-responsive img-circle" /></div>

                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="wow bounceInUp" data-wow-delay="0.8s">
                    <div class="team boxed-grey">
                      <div class="inner">
                        <h5>Harry Cam</h5>
                        <p class="subtitle">jQuery Ninja</p>
                        <div class="avatar"><img src="./../img/team/3.jpg" alt="" class="img-responsive img-circle" /></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="wow bounceInUp" data-wow-delay="1s">
                    <div class="team boxed-grey">
                      <div class="inner">
                        <h5>Woojun Choi</h5>
                        <p class="subtitle">Typographer</p>
                        <div class="avatar"><img src="./../img/team/4.jpg" alt="" class="img-responsive img-circle" /></div>

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
