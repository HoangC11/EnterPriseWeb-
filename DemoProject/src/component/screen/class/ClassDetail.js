import React, { Component } from 'react';
import '../../css/ClassDetailCSS.css'
import PeopleScreen from './PeopleScreen'
import BlogScreen from './BlogScreen'
import { getAllMemberInClass, getListBlogInClass, adminGetAllMemberInClass } from '../../api/apiUser'
import {userProfile, getDataLocal} from '../config/settings'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from 'react-router-dom'
class ClassDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataTeacher: undefined,
            dataStudents: [],

            dataListBlog: [],

            selectedPage: true,

        }
    }
    async getListBlog() {
        const response1 = await getListBlogInClass(this.props.match.params.id)
        console.log('mnbb :', response1)
        if (response1 !== undefined) {
            if (response1.statusCode === 1) {
                this.setState({
                    dataListBlog: response1.data
                })
            }
        }
    }
    async getAllMember(){
        let response = undefined
        if(userProfile.isAdmin || userProfile.isStaff ){
            response = await adminGetAllMemberInClass(this.props.match.params.id)
        }else{
            response = await getAllMemberInClass(this.props.match.params.id)
        }
        if (response !== undefined) {
            if (response.statusCode === 1) {
                this.setState({
                    dataTeacher: response.data.teacher,
                    dataStudents: response.data.students
                })
            }
        }
    }
    async componentDidMount() {
        if(userProfile.token === undefined || userProfile.token === ''){
            await getDataLocal()
        }
        this.getAllMember()

        this.getListBlog()
    }
    onChangeSelectedPage(state) {
        this.setState({
            selectedPage: state // false = page People, true = page Blog
        })

    }
    
    
    render() {
        const idClass = this.props.match.params.id
        return (
            <div className='header'>
                {!userProfile.isAdmin  && <a onClick={() => { this.onChangeSelectedPage(true) }} className='headerTitle' style={{ color: this.state.selectedPage ? 'orange' : null }}>Blog</a>}
                <a onClick={() => { this.onChangeSelectedPage(false) }} className='headerTitle1' style={{ color: userProfile.isAdmin ? 'orange' : ( !this.state.selectedPage ? 'orange' : null ) }}>People</a>
                <button onClick={() => this.setState({
                        goToScreen: !userProfile.isAdmin ? 'HomeUser' : 'HomeAdmin'})} className="headerBack" type="back"> Back</button>
                <div className='headerLine'></div>
                {userProfile.isAdmin ? 
                (
                    <PeopleScreen dataTeacher={this.state.dataTeacher} dataStudents={this.state.dataStudents} idClass={this.props.match.params.id} getAllMember={() => {this.getAllMember()}}/>
                )   
                :
                (
                    <div>
                        {!this.state.selectedPage &&
                        <PeopleScreen dataTeacher={this.state.dataTeacher} dataStudents={this.state.dataStudents} idClass={this.props.match.params.id} getAllMember={() => {this.getAllMember()}}/>
                    }
                    {this.state.selectedPage &&
                        <BlogScreen dataListBlog={this.state.dataListBlog} getListBlog={() => { this.getListBlog() }} idClass={idClass} />
                    }
                    </div>
                ) 
            }
                
                {this.state.goToScreen === 'HomeUser' &&
                  <Redirect to={{ pathname: '/Home' }} />
                    }
                    {this.state.goToScreen === 'HomeAdmin' &&
                  <Redirect to={{ pathname: '/HomeAdmin' }} />
                    }
            </div>
        );
    }
}

export default ClassDetail;