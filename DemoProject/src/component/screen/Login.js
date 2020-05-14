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
import {forGotPassword} from '../api/apiUser'
class Login extends React.Component {
    state = {
        username: 'nguyenthib',
        password: '123456789',
        goToScreen: '',
        emailForgot: ''
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
    async componentDidMount(){
        if(localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== null){
            var isAdmin = localStorage.getItem('isAdmin')
            var isStaff = localStorage.getItem('isStaff')
            console.log('uuuu: ', isAdmin)
            console.log('yyy: ', isStaff)
            if(isAdmin === 'true' || isStaff === 'true'  ){
            }else{
                await getDataLocal()
                 this.setState({
                 goToScreen: 'Home'
                })
            }
            
        }
    }
    onClickLogin = async () => {
        const response = await userLoginApi(this.state.username, this.state.password)
        console.log('rrrrr: ', response)
        if (response !== undefined) {
            if (response.statusCode === 1) {
                
                if(response.data.isAdmin || response.data.isStaff){
                    alert('Bạn không có quyền truy cập vào hệ thống này')
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
                    goToScreen: 'Home'
                })
                }
                
            } else {
                alert('Đăng nhập không thành công')
            }
        } else {
            alert('Đăng nhập không thành công')
        }
        // if (this.state.username === '1') {
        //     this.setState({
        //         goToScreen: 'Home'
        //     })
        // } else {
        //     this.setState({
        //         goToScreen: 'HomeAdmin'
        //     })
        // }
    }
    onClickRegister = () => {
        this.setState({
            goToScreen: 'RegisterAccount'
        })
    }
    onClickForgotPassword = async() => {
        var t = prompt("Nhập email của bạn", '');
        if(t !== null){
            if(t === ''){
                alert('Không được để trống email')
            }else{
                const response = await forGotPassword(t)
                if (response !== undefined) {
                    if(response.statusCode === 1){
                        alert(response.message)
                    }else{
                        alert(response.message)
                    }
                }else{
                    alert('Không thể kết nối tới server')
                }
            }
        }
        
    }
    render() {
        
        return (
            <div className='body-login' >
                <div className='content'>
                    <h1 className='title'>Đăng nhập</h1>
                    
                    <div className='divUsername'>
                        {/* <label>Username:
                        <input type='text' value={this.state.username} onChange={this.onChangeUsername}></input>
                    </label> */}
                        <div>Username: </div>
                        <div><input type='text' value={this.state.username} onChange={this.onChangeUsername}></input></div>
                    </div>
                    <div className='divPassword'>
                        {/* <label>Password: <input type='text' value={this.state.password} onChange={this.onChangePassword}></input>
                    </label> */}
                        <div>Password: </div>
                        <div><input type='password' value={this.state.password} onChange={this.onChangePassword}></input></div>
                    </div>
                    <div className='divForGotPass' onClick={this.onClickForgotPassword}>Forgot Password</div>
                   
                    <div className='divButtonLogin'><button onClick={this.onClickLogin}>Đăng nhập</button></div>
                    <div className='divButtonRegister'><button onClick={this.onClickRegister}>Đăng ký</button></div>
                    {this.state.goToScreen === 'Home' &&
                        <Redirect to={{ pathname: 'Home' }} />
                    }
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
export default Login;