import React, { Component } from 'react';
import {userProfile} from '../screen/config/settings'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from 'react-router-dom'


class ForgotPassword extends React.Component {
    state = {
      goToScreen: '',
        newPassword: '',
        confirmPassword: '',
    }
    onChangeText(event, type){
        if(type === 1){
            this.setState({
                newPassword: event.target.value
            })
        }else if(type === 2){
            this.setState({
                confirmPassword: event.target.value
            })
        }
    }
  render() {
    return (
      <div>
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
        {/* ---- Include the above in your HEAD tag -------- */}
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
        {/* ---- Include the above in your HEAD tag -------- */}

        <title>Bootstrap Example</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
        <hr />
        <div className="container bootstrap snippet">
          <div className="row">
    <div className="col-sm-10"><h1>Forgot Password </h1></div>
            {/* <div className="col-sm-2"><a href="/users" className="pull-right"><img title="profile image" className="img-circle img-responsive" src="http://www.gravatar.com/avatar/28fd20ccec6865e2d5f0e1f4446eb7bf?s=100" /></a></div> */}
          </div>
          <div className="row">
           
            <div className="col-sm-9">
              <ul className="nav nav-tabs">
                {/* <li className="active"><a data-toggle="tab" href="#home">Home</a></li> */}
                {/* <li><a data-toggle="tab" href="#messages">Menu 1</a></li>
                <li><a data-toggle="tab" href="#settings">Menu 2</a></li> */}
              </ul>
              <div className="tab-content">
                <div className="tab-pane active" id="home">
                  <hr />
                  <form className="form" action="##" method="post" id="registrationForm">
                    <div className="form-group">
                      <div className="col-xs-6">
                        <label htmlFor="first_name"><h4>New password</h4></label>
                        <input onChange={(text) => {this.onChangeText(text, 1)}} value={this.state.fullname} type="text" className="form-control" name="first_name" id="first_name" placeholder="Fullname" title="enter your full name if any." />

                        <label htmlFor="first_name"><h4>Confirm password</h4></label>
                        <input onChange={(text) => {this.onChangeText(text, 2)}} value={this.state.fullname} type="text" className="form-control" name="first_name" id="first_name" placeholder="Fullname" title="enter your full name if any." />
                      </div>
                    </div>
            
                    <div className="form-group">
                      <div className="col-xs-12">
                        <br />
                        {/* <button  className="btn btn-lg btn-success" type="submit"><i className="glyphicon glyphicon-ok-sign"> Save</button> */}
                        <a className="btn btn-lg btn-success" onClick={() => {this.saveProfile()}}>Save</a>
                        
                      </div>
                    </div>
                  </form>
                  <hr />
                  {/* {this.state.goToScreen === 'HomeUser' &&
                        <Redirect to={{ pathname: '/Home' }} />
                    }
                    {this.state.goToScreen === 'HomeAdmin' &&
                        <Redirect to={{ pathname: '/HomeAdmin' }} />
                    } */}
                </div>{/*/tab-pane*/}
              </div>{/*/tab-pane*/}
            </div>{/*/tab-content*/}
          </div>{/*/col-9*/}
        </div>{/*/row*/}
      </div>
      
    );
  }
}
export default ForgotPassword;