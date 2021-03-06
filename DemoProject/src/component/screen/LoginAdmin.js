import React from 'react'
import '../css/LoginCSS.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from 'react-router-dom'
import HomeAdmin from './HomeAdmin'
import HomeUser from './HomeUser'
import { userLoginApi } from '../api/apiLogin'
import { userProfile, saveDataLocal, getDataLocal } from './config/settings'
class LoginAdmin extends React.Component {
    state = {
        username: 'Admin',
        password: 'admin1234',
        goToScreen: '',
    }
    async componentDidMount(){
        if(localStorage.getItem('token') !== undefined){
            var isAdmin = localStorage.getItem('isAdmin')
            var isStaff = localStorage.getItem('isStaff')
            console.log('xxxxxxxxxxxxxx: ', isAdmin + ' - - - ' + isStaff)
            if(isStaff === 'true'){
                await  getDataLocal()
                this.setState({
                    goToScreen: 'HomeAdmin'
                })
            }else if(isAdmin === 'true'){
				await  getDataLocal()
				this.setState({
                    goToScreen: 'ManagerAllUser'
                })
			}
           
        }
    }
    onChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    onChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    onClickLogin = async () => {
        const response = await userLoginApi(this.state.username, this.state.password)
        console.log('rrrrr: ', response)
        if (response !== undefined) {
            if (response.token !== undefined) {
                if(!response.data.isAdmin && !response.data.isStaff){
                    alert('You do not access to this system!')
                }else{
                    userProfile.username = this.state.username
                    userProfile.password = this.state.password
                    userProfile.token = response.token
                    userProfile.isTeacher = response.data.isTeacher
                    userProfile.isAdmin = response.data.isAdmin
                    userProfile.isStaff = response.data.isStaff
                    saveDataLocal(
                        this.state.username,
                        this.state.password,
                        response.token,
                        response.data.isAdmin,
                        response.data.isTeacher,
                        response.data.isStaff
                    )
                this.setState({
                    goToScreen: response.data.isStaff ? 'HomeAdmin' : 'ManagerAllUser'
                })
                }
                
            } else {
                alert('Login failed')
            }
        } else {
            alert('Login failed')
        }
    }
        render() {
            return (
                <div className='body' >
                    <div className='content'>
                        <h1 className='title'>Login</h1>
                        <div className='divUsername'>
                            {/* <label>Username:
                            <input type='text' value={this.state.username} onChange={this.onChangeUsername}></input>
                        </label> */}
                            <div>Username: </div>
                            <div><input type='email' value={this.state.username} onChange={this.onChangeUsername}></input></div>
                        </div>
                        <div className='divPassword'>
                            {/* <label>Password: <input type='text' value={this.state.password} onChange={this.onChangePassword}></input>
                        </label> */}
                            <div>Password: </div>
                            <div><input type='password' value={this.state.password} onChange={this.onChangePassword}></input></div>
                        </div>
                        <div className='submit'><button type="submit" onClick={this.onClickLogin}>Login</button></div>
                        {/* {this.state.goToScreen === 'Home' &&
                            <Redirect to={{ pathname: 'Home' }} />
                        } */}
                        {this.state.goToScreen === 'HomeAdmin' &&
                            <Redirect to={{ pathname: 'HomeAdmin' }} />
                        }
                        {this.state.goToScreen === 'RegisterAccount' &&
                            <Redirect to={{ pathname: 'RegisterAccount' }} />
                        }
                        {this.state.goToScreen === 'ManagerAllUser' &&
                            <Redirect to={{ pathname: 'ManagementAllUser' }} />
                            
                        }
                    </div>
                </div>
            );
        }
    }
    export default LoginAdmin;
