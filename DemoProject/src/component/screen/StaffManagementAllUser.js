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
import {staffGetAllUser, managerGetUserProfile, managerGetProfileById} from '../api/apiAdmin'
import ManagementProfile from './ManagementProfile'
export default class StaffManagementAllUser extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            dataAllUser: [],
            renderData: [],
            selectedUser: undefined,
            profileUserSelected: undefined,
            goToScreen: '',
        }
    }  
    
    
    async getAllUser(){
        const response = await staffGetAllUser()
        // console.log('000000000: ', response)
        if(response !== undefined){
            if(response.data !== undefined && response.data.length > 0){
                this.setState({
                    dataAllUser: response.data,
                    renderData : response.data.map((item) => {
                        return( 
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                            {item.name}
                            <a class="btn btn-outline-success my-2 my-sm-0" type="submit">{item.isStaff ? 'Staff' : item.isAdmin ? 'Admin' : item.isTeacher ? 'Teacher' : 'Student'}</a>
                            <a class="btn btn-outline-success my-2 my-sm-0" type="submit">{(item.classes !== undefined && item.classes.length > 0) ? 'Had class' : `No class yet` }</a>
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

    

    
    render(){
        
        return(
            <div>
                <div className='headerManageUser'>
                <h1>Management All User</h1>
                <button onClick={() => this.setState({
                                    goToScreen: 'HomeAdmin' })}>Back</button>
                
                </div>
                
                <ul class="list-group">
                    {this.state.renderData}
                </ul>
                {this.state.goToScreen === 'HomeAdmin' &&
                        <Redirect to={{ pathname: '/HomeAdmin' }} />
                    }

            </div>
        )
    }
}