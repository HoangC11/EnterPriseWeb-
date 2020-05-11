import React, {Component} from 'react'

export default class Dashboard extends React.Component{

    render(){
      return(
<div >
            <meta charSet="utf-8" />
            <link rel="apple-touch-icon" sizes="76x76" href="../assets/img/apple-icon.png" />
            <link rel="icon" type="image/png" href="../assets/img/favicon.ico" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
            <title>Light Bootstrap Dashboard - Free Bootstrap 4 Admin Dashboard by Creative Tim</title>
            <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no" name="viewport" />
            {/*     Fonts and icons     */}
            <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200" rel="stylesheet" />
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" />
            {/* CSS Files */}
            <link href="../assets/css/bootstrap.min.css" rel="stylesheet" />
            <link href="../assets/css/light-bootstrap-dashboard.css?v=2.0.0 " rel="stylesheet" />
            {/* CSS Just for demo purpose, don't include it in your project */}
            <link href="../assets/css/demo.css" rel="stylesheet" />
            <div className="wrapper">
              <div className="sidebar" data-image="../assets/img/sidebar-5.jpg">
                {/*
            Tip 1: You can change the color of the sidebar using: data-color="purple | blue | green | orange | red"
    
            Tip 2: you can also add an image using data-image tag
        */}
                <div className="sidebar-wrapper">
                 
                  
                </div>
              </div>
              <div className="main-panel">
                {/* Navbar */}
                <nav className="navbar navbar-expand-lg " color-on-scroll={500}>
                  <div className="container-fluid">
                    
                    
                  </div>
                </nav>
                {/* End Navbar */}
                <div className="content">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="card ">
                          <div className="card-header ">
                            <h4 className="card-title">Email Statistics</h4>
                            <p className="card-category">Last Campaign Performance</p>
                          </div>
                          <div className="card-body ">
                            <div id="chartPreferences" className="ct-chart ct-perfect-fourth" />
                            <div className="legend">
                              <i className="fa fa-circle text-info" /> Open
                              <i className="fa fa-circle text-danger" /> Bounce
                              <i className="fa fa-circle text-warning" /> Unsubscribe
                            </div>
                            <hr />
                            <div className="stats">
                              <i className="fa fa-clock-o" /> Campaign sent 2 days ago
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="card ">
                          <div className="card-header ">
                            <h4 className="card-title">Users Behavior</h4>
                            <p className="card-category">24 Hours performance</p>
                          </div>
                          <div className="card-body ">
                            <div id="chartHours" className="ct-chart" />
                          </div>
                          <div className="card-footer ">
                            <div className="legend">
                              <i className="fa fa-circle text-info" /> Open
                              <i className="fa fa-circle text-danger" /> Click
                              <i className="fa fa-circle text-warning" /> Click Second Time
                            </div>
                            <hr />
                            <div className="stats">
                              <i className="fa fa-history" /> Updated 3 minutes ago
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                   </div>
                   </div>
              </div>
            </div>
            {/*   */}
            {/* <div class="fixed-plugin">
        <div class="dropdown show-dropdown">
            <a href="#" data-toggle="dropdown">
                <i class="fa fa-cog fa-2x"> </i>
            </a>
    
            <ul class="dropdown-menu">
                <li class="header-title"> Sidebar Style</li>
                <li class="adjustments-line">
                    <a href="javascript:void(0)" class="switch-trigger">
                        <p>Background Image</p>
                        <label class="switch">
                            <input type="checkbox" data-toggle="switch" checked="" data-on-color="primary" data-off-color="primary"><span class="toggle"></span>
                        </label>
                        <div class="clearfix"></div>
                    </a>
                </li>
                <li class="adjustments-line">
                    <a href="javascript:void(0)" class="switch-trigger background-color">
                        <p>Filters</p>
                        <div class="pull-right">
                            <span class="badge filter badge-black" data-color="black"></span>
                            <span class="badge filter badge-azure" data-color="azure"></span>
                            <span class="badge filter badge-green" data-color="green"></span>
                            <span class="badge filter badge-orange" data-color="orange"></span>
                            <span class="badge filter badge-red" data-color="red"></span>
                            <span class="badge filter badge-purple active" data-color="purple"></span>
                        </div>
                        <div class="clearfix"></div>
                    </a>
                </li>
                <li class="header-title">Sidebar Images</li>
    
                <li class="active">
                    <a class="img-holder switch-trigger" href="javascript:void(0)">
                        <img src="../assets/img/sidebar-1.jpg" alt="" />
                    </a>
                </li>
                <li>
                    <a class="img-holder switch-trigger" href="javascript:void(0)">
                        <img src="../assets/img/sidebar-3.jpg" alt="" />
                    </a>
                </li>
                <li>
                    <a class="img-holder switch-trigger" href="javascript:void(0)">
                        <img src="..//assets/img/sidebar-4.jpg" alt="" />
                    </a>
                </li>
                <li>
                    <a class="img-holder switch-trigger" href="javascript:void(0)">
                        <img src="../assets/img/sidebar-5.jpg" alt="" />
                    </a>
                </li>
    
                <li class="button-container">
                    <div class="">
                        <a href="http://www.creative-tim.com/product/light-bootstrap-dashboard" target="_blank" class="btn btn-info btn-block btn-fill">Download, it's free!</a>
                    </div>
                </li>
    
                <li class="header-title pro-title text-center">Want more components?</li>
    
                <li class="button-container">
                    <div class="">
                        <a href="http://www.creative-tim.com/product/light-bootstrap-dashboard-pro" target="_blank" class="btn btn-warning btn-block btn-fill">Get The PRO Version!</a>
                    </div>
                </li>
    
                <li class="header-title" id="sharrreTitle">Thank you for sharing!</li>
    
                <li class="button-container">
                    <button id="twitter" class="btn btn-social btn-outline btn-twitter btn-round sharrre"><i class="fa fa-twitter"></i> · 256</button>
                    <button id="facebook" class="btn btn-social btn-outline btn-facebook btn-round sharrre"><i class="fa fa-facebook-square"></i> · 426</button>
                </li>
            </ul>
        </div>
    </div>
     */}
            {/*   Core JS Files   */}
            {/*  Plugin for Switches, full documentation here: http://www.jque.re/plugins/version3/bootstrap.switch/ */}
            {/*  Google Maps Plugin    */}
            {/*  Chartist Plugin  */}
            {/*  Notifications Plugin    */}
            {/* Control Center for Light Bootstrap Dashboard: scripts for the example pages etc */}
            {/* Light Bootstrap Dashboard DEMO methods, don't include it in your project! */}
          </div>
      )
    }
}