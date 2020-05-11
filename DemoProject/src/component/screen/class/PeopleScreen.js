import React, { Component } from 'react';
import {adminGetAllUser, adminAddTeacher, adminAddStudent} from '../../api/apiAdmin'
import '../../css/ClassDetailCSS.css'
import { userProfile } from '../config/settings';
class PeopleScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visibleAddDialog: false,
            typeDialog: null, // 1 la them Teacher, 2 la them Student
            dataAllUser: [],
            addName: '',
            studentName: '',
            teacherName: '',

            renderStudents: [],
            renderTeacher: [],

            dataStudent: [],
            pickerStudents: [],
            pickerTeachers: [],

            selectedStudent: '',
            selectedTeacher: '',
            visibleTeacher: true
        }
    }
    async getAllUser(){
       const response = await adminGetAllUser()
       if(response !== undefined){
           if(response.statusCode === 1){
               let nameTC = ''
               let nameST = ''
               for(let item of response.data ){
                   if(item.isTeacher){
                       nameTC = item.name
                       break
                   }
               }
               for(let item of response.data ){
                if(!item.isTeacher){
                    nameST = item.name
                    break
                }
            }
                this.setState({
                    dataAllUser: response.data,
                    teacherName: nameTC,
                    studentName: nameST,               
                    
                    pickerStudents: response.data.map((item) => {
                        if(!item.isTeacher){
                        return (
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                            {item.name}
                            <button type='submit' value='Add' onClick={() => { this.onAddUserForClass()}}/>
                          </li>
                            )
                        }
                    }),

                    pickerTeachers: response.data.map((item) => {
                        if(item.isTeacher){
                        return (
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                            {item.name}
                            <button type='submit' value='Add' onClick={() => { this.onAddUserForClass()}}/>
                          </li>
                            )
                        }
                    })
                    // renderStudents: response.data.map((item) => {
                    //     if(item.isTeacher === false){
                    //     return (<div>{item.name}</div>)
                    //     }
                    // }),
                    // renderTeacher: response.data.map((item) => {
                    //     if(item.isTeacher === true){
                    //         return (<div>{item.name}</div>)
                    //         }
                    // })
                })
           }
       }
    }
    componentWillMount(){
        this.getAllUser()
    }
    componentDidMount(){
        this.setState({
            dataStudent: this.props.dataStudents
        })
    }
    componentDidUpdate(prevProps){
        if(prevProps.dataStudents !== this.props.dataStudents){
            if(this.props.dataStudents !== undefined && this.props.dataStudents.length > 0){
                this.setState({
                    dataStudent: this.props.dataStudents
                })
            }
        }
    }
    onChangeVisibleAddDialog = (visible, type ) => {
        this.setState({
            visibleAddDialog: visible,
            typeDialog: type,
            addName: type === 1 ? this.state.teacherName : this.state.studentName
        })
    }
    async onAddUserForClass(){
        if(this.state.typeDialog === 1){
            //Thêm giảng viên
            if(this.state.addName.trim() === ''){
                alert('Lecturer name cannot be empty !')
            }else {
                const user = this.state.dataAllUser.filter((item) => {
                    if(item.isTeacher === true){
                        if(item.name.toUpperCase().normalize() === this.state.addName.toUpperCase().normalize()){
                            return item
                        }
                    }
                })
                if(user !== undefined){
                    if(user.length > 0){
                        const response = await adminAddTeacher(this.props.idClass, user[0].id)
                        if(response !== undefined){
                            if(response.statusCode === 1){
                                alert('Add Success!')
                                this.setState({
                                    addName: '',
                                    visibleAddDialog: false
                                })
                                this.props.getAllMember()
                            }else{
                                alert(response.message)
                            }
                        }else{
                            alert('Add Failed !')
                        }
                    }else{
                        alert('Lecturer does not exist.')
                    }
                }else{
                    alert('Lecturer does not exist.')
                }
            }
        }else if( this.state.typeDialog === 2){
            // Thêm sinh viên
            if(this.state.addName.trim() === ''){
                alert('Student name cannot be empty !')
            }else {
                const user = this.state.dataAllUser.filter((item) => {
                    if(item.isTeacher !== true){
                        if(item.name.toUpperCase().normalize() === this.state.addName.toUpperCase().normalize()){
                            return item
                        }
                    }
                })
                if(user !== undefined){
                    if(user.length > 0){
                        const response = await adminAddStudent(this.props.idClass, user[0].id)
                        if(response !== undefined){
                            if(response.statusCode === 1){
                                alert('Add Success !')
                                this.setState({
                                    addName: '',
                                    visibleAddDialog: false
                                })
                                this.props.getAllMember()
                            }else{
                                alert(response.message)
                            }
                        }else{
                            alert('Add Failed !')
                        }
                    }else{
                        alert('Student does not exist.')
                    }
                }else{
                    alert('Student does not exist.')
                }
            }
        }else{

        }
    }

    onDeleteUser(user, type){
        // console.log('mmmmmmmmmmmmm: ', user)
        if(type === 0){
            this.setState({
                visibleTeacher: false
            })
        }else{
            let data = this.state.dataStudent.filter((item) => {
                return item._id !== user._id
            })
            this.setState({
                dataStudent: data
            })
        }
    }
    onChangeSelected(e){
        this.setState({ addName: e.target.value });
    }
    render() {
        return (
            <div className='viewContentPeople'>
                {this.state.visibleAddDialog &&
                    <div>
                        <div onClick={() => { this.onChangeVisibleAddDialog(false, null) }} className='divAddClassDialog'>

                        </div>
                        <div className='divTitleDialog'>
                            <a className='textTitleAddClassDialog'>{this.state.typeDialog === 1 ? 'Thêm giảng viên' : this.state.typeDialog === 2 ? 'Thêm sinh viên' : ''}</a>
                            <div className='divInput'>
                                <ul class="list-group">
                                {this.state.typeDialog === 1 ? 
                                    (
                                        this.state.pickerTeachers
                                    )    
                                    :
                                    (
                                        this.state.pickerStudents
                                    )
                              }
  {/* <li class="list-group-item d-flex justify-content-between align-items-center">
    Cras justo odio
    <span class="badge badge-primary badge-pill">14</span>
  </li>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    Dapibus ac facilisis in
    <span class="badge badge-primary badge-pill">2</span>
  </li>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    Morbi leo risus
    <span class="badge badge-primary badge-pill">1</span>
  </li> */}
</ul>
                                {/* <a>Nhập tên {this.state.typeDialog === 1 ? 'giảng viên' : this.state.typeDialog === 2 ? 'sinh viên' : ''}: </a>
                                <select value={this.state.addName} onChange={(e) => {
                                    this.onChangeSelected(e)
                                }}>
                                    {this.state.typeDialog === 1 ? 
                                    (
                                        this.state.pickerTeachers
                                    )    
                                    :
                                    (
                                        this.state.pickerStudents
                                    )
                                }
                                </select> */}
                            </div>
                            
                            {/* <div>
                                <input type='submit' value='Thêm' onClick={() => {this.onAddUserForClass()}}></input>
                            </div> */}


                        </div>
                    </div>
                }

                <div className='viewTitleTeacher'>
                    <div className='titleTeacher'>
                        <a>Teacher</a>
                        {userProfile.rule === 2  && 
                        (<a className='buttonAdd' onClick={() => { this.onChangeVisibleAddDialog(true, 1)}}>+</a>)
                        }
                    </div>
                    <div className='lineTitleTeacher'></div>
                    {this.state.visibleTeacher && 
                        <div className='viewItemTeacher'>
                        {userProfile.rule === 2 && <a onClick={() => {this.onDeleteUser(this.props.dataTeacher, 0)}} className='deleteIcon'> X </a>}
                            <img
                                className='avatarItemTeacher'
                                src={this.props.dataTeacher !== undefined ? this.props.dataTeacher.avatar : 'https://image.flaticon.com/icons/svg/2155/2155227.svg'}>
    
                            </img>
                            <a className='textItemTeacher'>{this.props.dataTeacher !== undefined ? this.props.dataTeacher.name : null}</a>
                        </div>
                    }

                    <div className='titleTeacher'>
                        <a>Students</a>
                        
                        {userProfile.rule === 2  && 
                        (<a className='buttonAdd' onClick={() => { this.onChangeVisibleAddDialog(true, 2)}}>+</a>)
                        }
                    </div>
                    <div className='lineTitleTeacher'></div>

                    {
                        this.state.dataStudent.length > 0 &&
                        this.state.dataStudent.map(item => {
                            return (
                                <div className='viewItemTeacher'>
                                    {userProfile.rule === 2 && <a onClick={() => {this.onDeleteUser(item, 1)}} className='deleteIcon'> X </a>}
                                    <img
                                        className='avatarItemTeacher'
                                        src={item.avatar}>

                                    </img>
                                    <a className='textItemTeacher'>{item.name}</a>
                                </div>
                            )
                        })
                    }
                    {/* {this.state.renderStudents}
                    {this.state.renderTeacher} */}
                </div>
            </div>
        );
    }
}

export default PeopleScreen;