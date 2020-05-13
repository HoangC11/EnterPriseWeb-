import React, { Component } from 'react';
import {userProfile, getDataLocal} from '../screen/config/settings'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from 'react-router-dom'


class ManagementAddUserToSystem extends React.Component {
    state = {
      goToScreen: '',
      name: '',
      gmail: '',
      password: '',
      passwordCfm: '',

    }
    
    async componentDidMount(){
      if(userProfile.token === undefined || userProfile.token === ''){
        await getDataLocal()
      }
        // this.getProfile()
    }
    onChangeText(text, type){
        // console.log('ttttttt: ', text)
        if(type === 1){
            this.setState({
                name: text.target.value
            })
        }else if(type === 2){
            this.setState({
                gmail: text.target.value
            })
        }else if(type === 3){
            this.setState({
                password: text.target.value
            })
        }else if(type === 4){
            this.setState({
                passwordCfm: text.target.value
            })
        
        }else{

        }
    }
    async apiAddUser(name, gmail, password, passwordCfm){
        const api = 'https://classroom1234.herokuapp.com/admin/user/add'
        let jsonBody = {
            name: name,
            gmail: gmail,
            password: password,
            passwordCfm: passwordCfm
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
                    message: 'Không thể kết nối tới server'
                }
            })
    }
    async addUser(){
        if(this.state.name.trim() === ''){
            alert('Not empty name')
        }else if( this.state.gmail.trim() === ''){
            alert('Not empty gmail')
        }else if( this.state.password.trim() === ''){
            alert('Not empty password')
        }else if( this.state.passwordCfm.trim() === ''){
            alert('Not empty password confirm')
        }else if(this.state.passwordCfm.trim().normalize() !== this.state.password.trim().normalize()){
            alert('Password and Password confirm is not the same')
        }else{
            const response = await this.apiAddUser(
                this.state.name.trim(),
                this.state.gmail.trim(),
                this.state.password.trim(),
                this.state.passwordCfm.trim(),
            )
            if(response !== undefined){
                if(response.data !== undefined && response.data.name !== undefined){
                    alert(response.message)
                    this.setState({
                        name: '',
                        gmail:'',
                        password: '',
                        passwordCfm: ''
                        
                    })
                }else{
                    alert('Add user failed')
                }
            }else{
                alert('Add user failed')
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
    <div className="col-sm-10"><h1>Add user to system</h1></div>
            
          </div>
          <div className="row">
            <div className="col-sm-3">{/*left col*/}      
            </div>{/*/col-3*/}
            <div className="col-sm-9">
              
              <div className="tab-content">
                <div className="tab-pane active" id="home">
                  <hr />
                  <form className="form" action="##" method="post" id="registrationForm">
                    <div className="form-group">
                      <div className="col-xs-6">
                        <label htmlFor="first_name"><h4>Name</h4></label>
                        <input onChange={(text) => {this.onChangeText(text, 1)}} value={this.state.name} type="text" className="form-control" name="first_name" id="first_name" placeholder="Name" title="enter your name if any." />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-xs-6">
                        <label htmlFor="mobile"><h4>Gmail</h4></label>
                        <input onChange={(text) => {this.onChangeText(text, 2)}} value={this.state.gmail} type="text" className="form-control" name="mobile" id="mobile" placeholder="Gmail" title="enter your gmail if any." />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-xs-6">
                        <label htmlFor="email"><h4>Password</h4></label>
                        <input onChange={(text) => {this.onChangeText(text, 3)}} value={this.state.password} type="password" className="form-control" name="email" id="email" placeholder="Password" title="enter your password." />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-xs-6">
                        <label htmlFor="email"><h4>Password Confirm</h4></label>
                        <input onChange={(text) => {this.onChangeText(text, 4)}} value={this.state.passwordCfm} type="password" className="form-control" id="location" placeholder="Password confirm" title="enter your password confirm" />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <div className="col-xs-12">
                        <br />
                        {/* <button  className="btn btn-lg btn-success" type="submit"><i className="glyphicon glyphicon-ok-sign"> Save</button> */}
                        <a className="btn btn-lg btn-success" onClick={() => {this.addUser()}}>Add</a>
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
                        <Redirect to={{ pathname: '/ManagementAllUser' }} />
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
export default ManagementAddUserToSystem;