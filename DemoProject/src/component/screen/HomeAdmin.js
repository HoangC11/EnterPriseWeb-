import React, { Component } from 'react';
import { getClasses, getAllClasses } from '../api/apiUser'
import { createClass, staffDeleteClassById } from '../api/apiAdmin'
import ItemBlog from './blog/ItemBlog'
import '../css/HomeAdminCSS.css'
import {userProfile, getDataLocal,removeDatalocal} from './config/settings'
import  PeopleScreen from './class/PeopleScreen'
// import  adminGetAllUser from '..api/apiAdmin'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from 'react-router-dom'
class HomeAdmin extends Component {
    state = {
        data: [],
        renderData: [],
        visibleAddClassDialog: false,
        addNameClass: '',
        addDesClass: '',
        addStartDate: this.defaultDate(new Date()),
        addEndDate: this.defaultDate(new Date()),
        addTimeClass: '06:00',
        goToScreen: '',

        profileData: undefined
    }

    defaultDate(date) {
        let d = new Date(date)
        let day = ('0' + d.getDate()).substr(-2)
        let month = ('0' + (d.getMonth() + 1)).substr(-2)
        let year = d.getFullYear()
        return year + '-' + month + '-' + day
    }
    formatDate(date) {
        let d = date.split('-')
        return d[2] + '/' + d[1] + '/' + d[0]
    }
    renderTableArr(arr) {
        const tableRows = []
        if (arr.length > 0 && arr.length >= 3) {
            for (let i = 0; i < arr.length; i += 3) {
                tableRows.push(
                    <tr>
                        <td></td>
                    </tr>
                )
            }
        }
    }
    async apiGetProfile(){
        const api = 'https://classroom1234.herokuapp.com/' + 'profile'
        return await fetch(api, {
            method: 'GET',
            headers: new Headers({
                'Authorization': userProfile.token
                // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNjQ3ZDZmOWE4MWQ4MDAxNzJhMzQyOSIsIm5hbWUiOiJob2FuZ2hvYSIsImF2YXRhciI6Ii8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvOTY1ZWZhOWVlYzQ4NTIzNTYwOTFiZTEwNDhkMzI5Mjg_cz0yMDAmcj1wZyZkPW1tIiwiaXNUZWFjaGVyIjp0cnVlLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTg0MTEwMjc0LCJleHAiOjE1ODQ5NzQyNzR9.aj_9bwls3AFdhTkrhSQhfch09ZwnC1YbZ8VE1R5QQqk'
            }),
        })
            .then(response => response.json())
            .catch(err => {
                return {
                    statusCode: -1,
                    message: 'Connect server failed!'
                }
            })
    }
    async getProfile(){
        const response = await this.apiGetProfile()
        if(response !== undefined){
            if(response.statusCode === 1){
                this.setState({
                    profileData: response.data
                })
            }
        }
    }
    async getAllClass(){
        const response = await getAllClasses()
        console.log('oooooooooooooo: ', response)
        if (response !== undefined) {
            if (response.statusCode === 1) {
                this.setState({
                    data: response.data,
                    renderData: response.data.map((item, index) => {
                        if (index % 3 === 0) {
                            return (
                                <tbody>
                                    <tr className='TableTrItem'>
                                        {response.data.map((value, i) => {
                                            if (i === index || i === index + 1 || i === index + 2) {
                                                return (<td className='TableTdItem'><ItemBlog getAllClass={() => {this.getAllClass()}} item={value} /></td>)
                                            } else {
                                                return null
                                            }
                                        })}
                                    </tr>
                                </tbody>
                            )
                        } else {
                            return null
                        }
                    })
                })
            }
        } else {

        }
    }
    async apiChangePassword(oldPass, newPass, confirmPass){
        const api = 'https://classroom1234.herokuapp.com/' + 'users/changepassword'
        const jsonbody = {
            oldPassword: oldPass,
            newPassword: newPass,
            passwordCfm: confirmPass,
        }
        return await fetch(api, {
            method: 'POST',
            headers: new Headers({
                'Authorization': userProfile.token,
                'Content-Type': 'application/json'
                // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNjQ3ZDZmOWE4MWQ4MDAxNzJhMzQyOSIsIm5hbWUiOiJob2FuZ2hvYSIsImF2YXRhciI6Ii8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvOTY1ZWZhOWVlYzQ4NTIzNTYwOTFiZTEwNDhkMzI5Mjg_cz0yMDAmcj1wZyZkPW1tIiwiaXNUZWFjaGVyIjp0cnVlLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTg0MTEwMjc0LCJleHAiOjE1ODQ5NzQyNzR9.aj_9bwls3AFdhTkrhSQhfch09ZwnC1YbZ8VE1R5QQqk'
            }),
            body: JSON.stringify(jsonbody)
        })
            .then(response => response.json())
            .catch(err => {
                return {
                    statusCode: -1,
                    message: 'Connect server failed!'
                }
            })
    }
    

    async onChangePassword(){
        var oldPass = prompt('Enter the old password ')
        var newPass = prompt('Enter the new password ')
        var confirmPass = prompt('Confirm the new password ')
        
        const response = await this.apiChangePassword(oldPass+'', newPass+'', confirmPass+'')
        if(response !== undefined){
            if(response.statusCode === 1){
                alert(response.message)
            }else{
                alert(response.message)
            }
        }else{
            alert('Connect server failed!')
        }
    }

    async componentDidMount() {
        if(userProfile.token === undefined || userProfile.token === ''){
            await getDataLocal()
        }
        this.getAllClass()
        this.getProfile()
    }
    onAddClass(visible) {

        this.setState({
            visibleAddClassDialog: visible
        })
    }
    onClickAddClass = async () => {
        const { addNameClass, addDesClass, addStartDate, addEndDate, addTimeClass } = this.state
        if (addNameClass.trim() === '') {
            alert('Please enter the class name !')
        } else if (addDesClass.trim() === '') {
            alert('Please enter the introductory content about the class !')
        } else {
            let name = addNameClass
            let des = addDesClass
            let startDate = this.formatDate(addStartDate)
            let endDate = this.formatDate(addEndDate)
            let time = addTimeClass
            const response = await createClass(name, des, startDate, endDate, time)
            if (response !== undefined) {
                if (response.statusCode === -1) {                    
                    alert(response.message)
                    this.getAllClass()
                    this.setState({
                        addNameClass: '',
                        addDesClass: '',
                        addStartDate: this.defaultDate(new Date()),
                        addEndDate: this.defaultDate(new Date()),
                        addTimeClass: '06:00',
                        visibleAddClassDialog: false
                    })
                }else {
                    alert(response.message)
                }
            }
        }
    }
    render() {
        const {profileData} = this.state
        return (
            <div className='divBody'>
                {this.state.visibleAddClassDialog &&
                    <div>
                        <div onClick={() => { this.onAddClass(false) }} className='divAddClassDialog'>

                        </div>
                        <div className='divTitleDialog'>
                            <a className='textTitleAddClassDialog'>Add Class</a>
                            <div>
                                <a>Name class: </a>
                                <input type='text' onChange={(event) => {
                                    this.setState({
                                        addNameClass: event.target.value
                                    })
                                }} />
                            </div>
                            <div>
                                <a>Description: </a>
                                <input type='text' onChange={(event) => {
                                    this.setState({
                                        addDesClass: event.target.value
                                    })
                                }} />
                            </div>
                            <div>
                                <a>Started day: </a>
                                <input type='date' value={this.state.addStartDate} onChange={(event) => {
                                    this.setState({
                                        addStartDate: event.target.value
                                    })
                                }} />
                            </div>
                            <div>
                                <a>Ended day: </a>
                                <input type='date' value={this.state.addEndDate} onChange={(event) => {
                                    this.setState({
                                        addEndDate: event.target.value
                                    })
                                }} />
                            </div>
                            <div>
                                <a>Time: </a>
                                <input type='time' value={this.state.addTimeClass} onChange={(event) => {
                                    this.setState({
                                        addTimeClass: event.target.value
                                    }, () => {
                                    })
                                }} />
                            </div>
                            <div>
                                <input type='submit' value='Thêm' onClick={this.onClickAddClass}></input>
                            </div>


                        </div>
                    </div>
                }
                <div className='header' >
                    {/* <img src='https://image.flaticon.com/icons/svg/813/813670.svg' className='iconHome' /> */}
                    <a className='titleScreens'>HOME STAFF</a>
                    <div className="profile dropdown">
                        <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Profile
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item">Account: {profileData !== undefined ? profileData.user.name : ''}</a>
            <a className="dropdown-item">Name: {profileData !== undefined ? profileData.fullname : ''}</a>
                            {/* <a className="dropdown-item">Facebook: {profileData !== undefined ? profileData.social.facebook : ''}</a> */}
            <a className="dropdown-item">Role: Staff</a>
                            <button onClick={() => {this.onChangePassword()}} className="dropdown-item btn btn-primary">Change password</button>
                            <button onClick={() => this.setState({
                        goToScreen: 'Profile'})} className="dropdown-item btn btn-primary">Update Profile</button>
                         <button onClick={() => this.setState({
                                    goToScreen: 'StaffManagementAllUser' })} className="dropdown-item btn btn-primary">Manage All User</button>
                            <button className="dropdown-item btn btn-primary" onClick={() => {
                                removeDatalocal()
                                this.setState({
                                    goToScreen: 'LoginAdmin'
                                })
                            }}>Log out</button>
                        </div>
                    </div>
                    
                </div>
                <div className='headerLineBotton'></div>
                <a className='textTitleClass'>Class</a>
                <div className='divTitleClass'>
                    {/* <a className='textTitlePeople'>All People</a> */}
                    <a onClick={() => { this.onAddClass(true) }} className='textAddClass'>Add Class + </a>
                </div>
                <div style={{}} className='ListItem'>

                    <table className='TableItem'>
                        {this.state.renderData}
                    </table>

                        {this.state.goToScreen === 'LoginAdmin' &&
                            <Redirect to={{ pathname: 'LoginAdmin' }} />
                        }
                        {this.state.goToScreen === 'Profile' &&
                        <Redirect to={{ pathname: 'Profile' }} />
                        }
                        {this.state.goToScreen === 'StaffManagementAllUser' &&
                        <Redirect to={{ pathname: 'StaffManagementAllUser' }} />
                        }

                </div>

            </div>


        );
    }
}

const styles = {
    header: {
        width: '100%',
        height: 50,
        backgroundColor: 'red',

    }
}
export default HomeAdmin;