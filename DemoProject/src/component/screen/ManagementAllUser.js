import React, { Component } from 'react';
import {userProfile, getDataLocal} from '../screen/config/settings'
import '../css/HomeAdminCSS.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from 'react-router-dom'
import {managerGetAllUser, managerGetUserProfile, managerGetProfileById} from '../api/apiAdmin'
import ManagementProfile from './ManagementProfile'
export default class ManagementAllUser extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            dataAllUser: [],
            renderData: [],
            selectedUser: undefined,
            profileUserSelected: undefined
        }
    }
    onChangeSelectedUser(){
        this.setState({
            selectedUser: undefined
        })
    }

    async getProfileByUser(id){
        
        const response = await managerGetProfileById(id)
        console.log('5555555555555: ' , response)
        if(response !== undefined){
            if(response.data !== undefined && response.data._id !== undefined){
                this.setState({
                    profileUserSelected: response.data
                })
            }
        }
    }
    onSelectedUser(item){
        this.setState({
            selectedUser: item
        }, () => {
            this.getProfileByUser(item.id)
        })
    }
    
    async getAllUser(){
        const response = await managerGetAllUser()
        if(response !== undefined){
            if(response.data !== undefined && response.data.length > 0){
                this.setState({
                    dataAllUser: response.data,
                    renderData : response.data.map((item) => {
                        return( 
                            <li onClick={() => {this.onSelectedUser(item)}} class="list-group-item d-flex justify-content-between align-items-center">
                            {item.name}
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">{item.isStaff ? 'Staff' : item.isAdmin ? 'Admin' : item.isTeacher ? 'Teacher' : 'Student'}</button>
                            {/* <button class="btn btn-outline-success my-2 my-sm-0" type="submit"></button> */}
                            </li>
                        )
                    })
                })
            }
        }
    }
    async componentDidMount(){
        if(userProfile.token === undefined || userProfile.token === ''){
            await getDataLocal()
        }
        this.getAllUser()   
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
                    message: 'Connect server failed'
                }
            })
    }
    

    async onChangePassword(){
        var oldPass = prompt('Input old password ')
        var newPass = prompt('Inpupt new password ')
        var confirmPass = prompt('Confirm new password ')
        
        const response = await this.apiChangePassword(oldPass+'', newPass+'', confirmPass+'')
        if(response !== undefined){
            if(response.statusCode === 1){
                alert(response.message)
            }else{
                alert(response.message)
            }
        }else{
            alert('Connect server failed')
        }
    }
    render(){
        
        return(
            <div>
                <div className='headerManageUser'>
                <h1>Management User</h1>
                <button onClick={() => {this.onChangePassword()}} className="dropdown-item btn btn-primary">Change password</button>
                </div>
                {this.state.selectedUser !== undefined && 
                    (
                        <ManagementProfile 
                        user={this.state.selectedUser} 
                        getAllUser={() => {this.getAllUser()}} 
                        onChangeSelectedUser={() => {this.onChangeSelectedUser()}}
                        profileUserSelected={this.state.profileUserSelected}
                        />
                    )
                }
                <ul class="list-group">
                    {this.state.renderData}
                </ul>

            </div>
        )
    }
}