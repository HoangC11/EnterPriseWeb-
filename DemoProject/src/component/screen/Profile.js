import React, { Component } from 'react';
import {userProfile, getDataLocal} from '../screen/config/settings'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from 'react-router-dom'


class Profile extends React.Component {
    state = {
      goToScreen: '',
      fullname: '',
      maso: '',
      facebook: '',
      zalo: '',
      twitter: '',
      instagram: '',

    }
    async apiGetProfile(){
        const api = 'https://classroom1234.herokuapp.com/' + 'profile'
        return await fetch(api, {
            method: 'GET',
            headers: new Headers({
                'Authorization': userProfile.token,
            }),
        })
            .then(response => response.json())
            .catch(err => {
                return {
                    statusCode: -1,
                    message: 'Connect server failed'
                }
            })
    }
    async getProfile(){
        const response = await this.apiGetProfile()
        console.log('hhhhhhhhhhh' , response)
        if(response !== undefined){
          // console.log('qqqqqqqqqqq' , response.data.social.facebook)
            if(response.statusCode === 1){
                this.setState({
                  name: response.data.user.name,
                    fullname: response.data.fullname,
                    maso: response.data.maso,
                    // facebook: response.data.social.facebook,
                    // zalo: response.data.social.zalo,
                    // twitter: response.data.social.twitter,
                    // instagram: response.data.social.instagram,
                })
            }else{
                // alert('123')
            }
        }else{
            // alert('456')
        }
    }
    async componentDidMount(){
      if(userProfile.token === undefined || userProfile.token === ''){
        await getDataLocal()
      }
        this.getProfile()
    }
    onChangeText(text, type){
        // console.log('ttttttt: ', text)
        if(type === 1){
            this.setState({
                fullname: text.target.value
            })
        }else if(type === 2){
            this.setState({
                maso: text.target.value
            })
        }else if(type === 3){
            this.setState({
                facebook: text.target.value
            })
        }else if(type === 4){
            this.setState({
                zalo: text.target.value
            })
        }else if(type ===5){
            this.setState({
                twitter: text.target.value
            })
        }else if(type === 6){
            this.setState({
                instagram: text.target.value
            })
        }else{

        }
    }
    async apiAddProfile(fullname, maso, facebook, zalo, twitter, instagram){
        const api = 'https://classroom1234.herokuapp.com/' + 'profile/'
        let jsonBody = {
            fullname: fullname,
            maso: maso+'',
            // facebook: facebook,
            // zalo: zalo+'',
            // twitter: twitter,
            // instagram: instagram
        }
        return await fetch(api, {
            method: 'POST',
            headers: new Headers({
                'Authorization': userProfile.token,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(jsonBody)
        })
            .then(response => response.json())
            .catch(err => {
                return {
                    statusCode: -1,
                    message: 'Connect server failed'
                }
            })
    }
    async saveProfile(){
        if(this.state.fullname.trim() === ''){
            alert(' Fullname is not empty')
        }else if( (this.state.maso + '').trim() === ''){
            alert('Code is not empty')
        }else{
            const response = await this.apiAddProfile(
                this.state.fullname.trim(),
                this.state.maso,
                // this.state.facebook.trim(),
                // this.state.zalo,
                // this.state.twitter.trim(),
                // this.state.instagram.trim(),
            )
            if(response !== undefined){
                if(response.statusCode === 1){
                    alert(response.message)
                }else{
                    alert('Update profile failed')
                }
            }else{
                alert('Update profile failed')
            }
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
    <div className="col-sm-10"><h1>Hello {this.state.name}</h1></div>
            <div className="col-sm-2"><a  className="pull-right"><img title="Update Profile " className="img-circle img-responsive" src="http://www.gravatar.com/avatar/28fd20ccec6865e2d5f0e1f4446eb7bf?s=100" /></a></div>
          </div>
          <div className="row">
            <div className="col-sm-3">{/*left col*/}
              
              
              
              
            </div>{/*/col-3*/}
            <div className="col-sm-9">
              <ul className="nav nav-tabs">
                <li className="active"><a data-toggle="tab" href="#home">Home</a></li>
                {/* <li><a data-toggle="tab" href="#messages">Menu 1</a></li>
                <li><a data-toggle="tab" href="#settings">Menu 2</a></li> */}
              </ul>
              <div className="tab-content">
                <div className="tab-pane active" id="home">
                  <hr />
                  <form className="form" action="##" method="post" id="registrationForm">
                    <div className="form-group">
                      <div className="col-xs-6">
                        <label htmlFor="first_name"><h4>Full Name</h4></label>
                        <input onChange={(text) => {this.onChangeText(text, 1)}} value={this.state.fullname} type="text" className="form-control" name="first_name" id="first_name" placeholder="Fullname" title="enter your full name if any." />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-xs-6">
                        <label htmlFor="mobile"><h4>Student ID</h4></label>
                        <input onChange={(text) => {this.onChangeText(text, 2)}} value={this.state.maso} type="text" className="form-control" name="mobile" id="mobile" placeholder="16392" title="enter your mobile number if any." />
                      </div>
                    </div>
                    {/* <div className="form-group">
                      <div className="col-xs-6">
                        <label htmlFor="email"><h4>Facebook</h4></label>
                        <input onChange={(text) => {this.onChangeText(text, 3)}} value={this.state.facebook} type="text" className="form-control" name="email" id="email" placeholder="facebook.com/" title="enter your facebook." />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-xs-6">
                        <label htmlFor="email"><h4>Zalo</h4></label>
                        <input onChange={(text) => {this.onChangeText(text, 4)}} value={this.state.zalo} type="text" className="form-control" id="location" placeholder="phone number" title="enter your Zalo" />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-xs-6">
                        <label htmlFor="password"><h4>Twitter</h4></label>
                        <input onChange={(text) => {this.onChangeText(text, 5)}} value={this.state.twitter} type="text" className="form-control" name="password" id="password" placeholder="twitter.com/" title="enter your Twitter." />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-xs-6">
                        <label htmlFor="password2"><h4>Instagram</h4></label>
                        <input onChange={(text) => {this.onChangeText(text, 6)}} value={this.state.instagram} type="text" className="form-control" name="password2" id="password2" placeholder="instagram.com/" title="enter your Instagram." />
                      </div>
                    </div> */}
                    <div className="form-group">
                      <div className="col-xs-12">
                        <br />
                        {/* <button  className="btn btn-lg btn-success" type="submit"><i className="glyphicon glyphicon-ok-sign"> Save</button> */}
                        <a className="btn btn-lg btn-success" onClick={() => {this.saveProfile()}}>Save</a>
                        <button onClick={() => this.setState({
                        goToScreen: (!userProfile.isAdmin && !userProfile.isStaff) ? 'HomeUser' : 'HomeAdmin'
                    })} className="btn btn-lg" type="back"> Back</button>
                      </div>
                    </div>
                  </form>
                  <hr />
                  {this.state.goToScreen === 'HomeUser' &&
                        <Redirect to={{ pathname: '/Home' }} />
                    }
                    {this.state.goToScreen === 'HomeAdmin' &&
                        <Redirect to={{ pathname: '/HomeAdmin' }} />
                    }
                </div>{/*/tab-pane*/}
              </div>{/*/tab-pane*/}
            </div>{/*/tab-content*/}
          </div>{/*/col-9*/}
        </div>{/*/row*/}
      </div>
      
    );
  }
}
export default Profile;