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
import { userProfile } from './config/settings'
class LoginAdmin extends React.Component {
    state = {
        username: 'Admin',
        password: 'admin1234',
        goToScreen: '',
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
            if (response.statusCode === 1) {
                if(!response.data.isAdmin){
                    alert('Bạn không có quyền đăng nhập vào hệ thống')
                }else{
                    userProfile.username = this.state.username
                    userProfile.password = this.state.password
                    userProfile.token = response.token
                    userProfile.rule = 2
                this.setState({
                    goToScreen: 'HomeAdmin'
                })
                }
                
            } else {
                alert('Đăng nhập không thành công')
            }
        } else {
            alert('Đăng nhập không thành công')
        }
    }
        render() {
            return (
                <div className='body' >
                    <div className='content'>
                        <h1 className='title'>Đăng nhập</h1>
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
                        <div className='submit'><button type="submit" onClick={this.onClickLogin}>Đăng nhập</button></div>
                        {/* {this.state.goToScreen === 'Home' &&
                            <Redirect to={{ pathname: 'Home' }} />
                        } */}
                        {this.state.goToScreen === 'HomeAdmin' &&
                            <Redirect to={{ pathname: 'HomeAdmin' }} />
                        }
                        {this.state.goToScreen === 'RegisterAccount' &&
                            <Redirect to={{ pathname: 'RegisterAccount' }} />
                        }
                    </div>
                </div>
            );
        }
    }
    export default LoginAdmin;
