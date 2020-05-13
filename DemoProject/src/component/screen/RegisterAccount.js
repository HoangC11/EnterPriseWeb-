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
            alert('Username must not be blank')
        } else if (this.state.password.trim() === '') {
            alert('Password must not be blank')
        } else if (this.state.passwordCfm.trim() === '') {
            alert('Password Confirm must not be blank')
        } else if (this.state.email.trim() === '') {
            alert('Email must not be blank')
        } else if (this.state.password.trim() !== this.state.passwordCfm.trim()) {
            alert('Password and Password Confirm is not the same')
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
                    alert('Register success!')
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
                alert('Connect server failed')
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
                <div className='title'>Register Account</div>
                    <div className='viewLineForm'>
                        <a className='textTitleForm'>Username:  </a>
                        <input type='text' value={this.state.username} onChange={event => this.onChangeTextForm(event.target.value, 1)} className='inputForm'></input>
                    </div>
                    <div className='viewLineForm'>
                        <a className='textTitleForm'>Password:  </a>
                        <input type='password' value={this.state.password} onChange={event => this.onChangeTextForm(event.target.value, 2)} className='inputForm'></input>
                    </div>
                    <div className='viewLineForm'>
                        <a className='textTitleForm'>Password Confirm:  </a>
                        <input type='password' value={this.state.passwordCfm} onChange={event => this.onChangeTextForm(event.target.value, 3)} className='inputForm'></input>
                    </div>
                    <div className='viewLineForm'>
                        <a className='textTitleForm'>Email:  </a>
                        <input type='text' value={this.state.email} onChange={event => this.onChangeTextForm(event.target.value, 4)} className='inputForm'></input>
                    </div>
                    <div className='viewLineForm'>
                        <a className='textTitleForm'>Code:  </a>
                        <input type='text' value={this.state.code} onChange={event => this.onChangeTextForm(event.target.value, 5)} className='inputForm'></input>
                    </div>
<button onClick={this.onClickBack} className='buttonRegister'>BACK</button>
                    <button onClick={this.onClickRegister} className='buttonRegister'>REGISTER</button>


                    {this.state.goToScreen === 'Login' &&
                        <Redirect to={{ pathname: '/' }} />
                    }
                </div>
            </div>
            
        );
    }
}

export default RegisterAccount;