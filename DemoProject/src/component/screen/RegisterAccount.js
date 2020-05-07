import React, { Component } from 'react';
import '../css/RegisterAccountComponentCSS.css'
import { registerAccountApi } from '../api/apiRegisterAccount'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from 'react-router-dom'
class RegisterAccount extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            passwordCfm: '',
            email: '',
            code: '',
            goToScreen: '',
        }
    }
    onChangeTextForm = (text, key) => {
        if (key === 1) {
            this.setState({
                username: text
            })
        } else if (key === 2) {
            this.setState({
                password: text
            })
        } else if (key === 3) {
            this.setState({
                passwordCfm: text
            })
        } else if (key === 4) {
            this.setState({
                email: text
            })
        } else {
            this.setState({
                code: text
            })
        }
    }

    onClickRegister = async () => {
        if (this.state.username.trim() === '') {
            alert('Không được để trống Username')
        } else if (this.state.password.trim() === '') {
            alert('Không được để trống Password')
        } else if (this.state.passwordCfm.trim() === '') {
            alert('Không được để trống Password Confirm')
        } else if (this.state.email.trim() === '') {
            alert('Không được để trống Email')
        } else if (this.state.password.trim() !== this.state.passwordCfm.trim()) {
            alert('Password và Password Confirm không giống nhau')
        } else {
            const response = await registerAccountApi(
                this.state.username.trim(),
                this.state.password.trim(),
                this.state.passwordCfm.trim(),
                this.state.email.trim(),
                this.state.code.trim()
            )
            console.log('ressponse: ', response)
            if (response !== undefined) {
                if (response.statusCode === 1) {
                    alert('Đăng kí thành công')
                    this.setState({
                        username: '',
                        password: '',
                        passwordCfm: '',
                        email: '',
                        code: ''

                    })
                }else{
                    console.log('222222: ', response)
                    let string = ''
                    if(response.name !== undefined){
                        string += response.name + '\n'
                    }
                    if(response.password !== undefined){
                        string += response.password + '\n'
                    }
                    if(response.passwordCfm !== undefined){
                        string += response.passwordCfm + '\n'
                    }
                    if(response.gmail !== undefined){
                        string += response.gmail + '\n'
                    }

                    
                    // if(response.gmail !== undefined){
                    //     string += response.gmail + '\n'
                    // }
                    alert(string)
                }
            }else{
                alert('Không thể kết nối tới server')
            }
        }
    }
    onClickBack= () => {
        this.setState({
        goToScreen: 'Login'
        })
    }
    render() {
        return (
            <div className='body'>
                
                <div className='viewRegister'>
                <div className='title'>Đăng ký tài khoản</div>
                    <div className='viewLineForm'>
                        <a className='textTitleForm'>Username:  </a>
                        <input type='text' value={this.state.username} onChange={event => this.onChangeTextForm(event.target.value, 1)} className='inputForm'></input>
                    </div>
                    <div className='viewLineForm'>
                        <a className='textTitleForm'>Password:  </a>
                        <input type='text' value={this.state.password} onChange={event => this.onChangeTextForm(event.target.value, 2)} className='inputForm'></input>
                    </div>
                    <div className='viewLineForm'>
                        <a className='textTitleForm'>Password Confirm:  </a>
                        <input type='text' value={this.state.passwordCfm} onChange={event => this.onChangeTextForm(event.target.value, 3)} className='inputForm'></input>
                    </div>
                    <div className='viewLineForm'>
                        <a className='textTitleForm'>Email:  </a>
                        <input type='text' value={this.state.email} onChange={event => this.onChangeTextForm(event.target.value, 4)} className='inputForm'></input>
                    </div>
                    <div className='viewLineForm'>
                        <a className='textTitleForm'>Code:  </a>
                        <input type='text' value={this.state.code} onChange={event => this.onChangeTextForm(event.target.value, 5)} className='inputForm'></input>
                    </div>
<button onClick={this.onClickBack} className='buttonRegister'>QUAY LẠI</button>
                    <button onClick={this.onClickRegister} className='buttonRegister'>ĐĂNG KÝ</button>


                    {this.state.goToScreen === 'Login' &&
                        <Redirect to={{ pathname: 'Login' }} />
                    }
                </div>
            </div>
            
        );
    }
}

export default RegisterAccount;