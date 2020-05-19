import React, { Component } from 'react';
import {adminGetAllUser, adminAddTeacher, adminAddStudent, staffDeleteUserByClass, adminGetAllStudentNotJoinClass, adminGetAllTeacherNotJoinClass, staffAddManyStudents} from '../../api/apiAdmin'
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
            dataStudentsSelected: [],
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
                        if(!item.isTeacher && !item.isAdmin && !item.isStaff){
                        return (
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                            {item.name}
                            <button onClick={() => { this.onAddUserForClass(item)}} class="btn btn-outline-success my-2 my-sm-0" type="submit">Add</button>
                            
                          </li>
                            )
                        }
                    }),

                    pickerTeachers: response.data.map((item) => {
                        if(item.isTeacher){
                        return (
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                            {item.name}
                            <button onClick={() => { this.onAddUserForClass(item)}} class="btn btn-outline-success my-2 my-sm-0" type="submit">Add</button>
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
    async getAllStudentNotJoinClass(){
        const response = await adminGetAllStudentNotJoinClass(this.props.idClass)
        if(response !== undefined){
            if(response.statusCode === 1){
                if(response.data !== undefined && response.data.length > 0){                
                    this.setState({
                        nameST: response.data[0].name,
                        dataStudentsSelected: response.data.map((item) => {
                            return Object.assign(item, {selected: false})
                        }),
                        
                        
                    }, () => {
                        this.setState({
                            pickerStudents: this.state.dataStudentsSelected.map((item) => {
                                // if(!item.isTeacher && !item.isAdmin && !item.isStaff){
                                
                                // }
                                return (
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                    {item.name}
                                <button onClick={() => { this.onAddUserForClass(item)}} class="btn btn-outline-success my-2 my-sm-0" type="submit">{!item.selected ? 'Add' : 'X'}</button>
                                    
                                  </li>
                                    )
                            }),
                        })
                    })
                }
            }
        }
    }

    async getAllTeacherNotJoinClass(){
        const response = await adminGetAllTeacherNotJoinClass(this.props.idClass)
        if(response !== undefined){
            if(response.statusCode === 1){
                if(response.data !== undefined && response.data.length > 0){
                    this.setState({
                        nameTC: response.data[0].name,
                        pickerTeachers: response.data.map((item) => {
                            // if(!item.isTeacher && !item.isAdmin && !item.isStaff){
                            
                            // }
                            return (
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                {item.name}
                                <button onClick={() => { this.onAddUserForClass(item)}} class="btn btn-outline-success my-2 my-sm-0" type="submit">Add</button>
                                
                              </li>
                                )
                        }),
                        
                    })
                }
            }
        }
    }


    componentWillMount(){
        this.getAllStudentNotJoinClass()
        this.getAllTeacherNotJoinClass()
        // this.getAllUser()
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
    async onAddUserForClass(item){
        if(this.state.typeDialog === 1){
            //Thêm giảng viên
            const response = await adminAddTeacher(this.props.idClass, item.id)
                        if(response !== undefined){
                            if(response.statusCode === 1){
                                alert('Add Success!')   
                                this.getAllTeacherNotJoinClass()                                    
                                this.props.getAllMember()
                            }else{
                                alert(response.message)
                            }
                        }else{
                            alert('Add Failed !')
                        }
        }else if( this.state.typeDialog === 2){
            // Thêm sinh viên

            let data = this.state.dataStudentsSelected.map((value) => {
                if(item.id === value.id){
                    return Object.assign(value, {selected: !value.selected})
                }else{
                    return value
                }
            })
            if(data.length > 0){
                this.setState({
                    dataStudentsSelected: data
                }, () => {
                    console.log('ereee: ', this.state.dataStudentsSelected)
                    this.setState({
                        pickerStudents: this.state.dataStudentsSelected.map((item) => {
                            // if(!item.isTeacher && !item.isAdmin && !item.isStaff){
                            
                            // }
                            return (
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                {item.name}
                            <button onClick={() => { this.onAddUserForClass(item)}} class="btn btn-outline-success my-2 my-sm-0" type="submit">{!item.selected ? 'Add' : 'X'}</button>
                                
                              </li>
                                )
                        }),
                    })
                })
            }
        }else{

        }
    }

    async onDeleteUser(user, type){
        if(user !== undefined){
            if(type === 0){
           
                const response = await staffDeleteUserByClass(this.props.idClass, user._id)
                if(response !== undefined){
                    if(response.success !== undefined && response.success){
                        this.props.getAllMember()
                        alert('Delete teacher success')
                    }
                    
                }else{
                    alert('Delete teacher failed')
                }
            }else{
                const response = await staffDeleteUserByClass(this.props.idClass, user._id)
                if(response !== undefined){
                    if(response.success !== undefined && response.success){
                        alert('Delete student success')
                        this.props.getAllMember()
                    }
                    // this.getAllUser()
                    
                }else{
                    alert('Delete student failed')
                }
            }
        }
    }
    async addManyStudent(){
        let arrayStudents = this.state.dataStudentsSelected.filter((item) => {
            if(item.selected){
                return item
            }
        })
        let arr = []
        if(arrayStudents.length> 0 ){
             arr = arrayStudents.map((item) => {
                return item.id
            })
        }
        if(arr.length > 0){
            const response = await staffAddManyStudents(this.props.idClass, arr)
            if(response !== undefined){
                if(response.success){
                    alert('Add many student success')
                    this.props.getAllMember()
                    this.getAllStudentNotJoinClass()
                }else{
                    alert('Add many student failed')
                }
            }else{
                alert('Add many student failed')
            }
        }else{
            alert('You must choose student')
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
                            <a className='textTitleAddClassDialog'>{this.state.typeDialog === 1 ? 'Add teacher' : this.state.typeDialog === 2 ? 'Add student' : ''}</a>
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
</ul>
{this.state.typeDialog !== 1 && 
                                (<button onClick={() => {this.addManyStudent()}} type="button" class="btn btn-primary">Add students</button>)
                              }
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
                        {userProfile.isStaff && 
                        (<a className='buttonAdd' onClick={() => { this.onChangeVisibleAddDialog(true, 1)}}>+</a>)
                        }
                    </div>
                    <div className='lineTitleTeacher'></div>
                    {this.state.visibleTeacher && 
                        <div className='viewItemTeacher'>
                        {userProfile.isStaff && <a onClick={() => {this.onDeleteUser(this.props.dataTeacher, 0)}} className='deleteIcon'> X </a>}
                            <img
                                className='avatarItemTeacher'
                                src={this.props.dataTeacher !== undefined ? this.props.dataTeacher.avatar : 'https://image.flaticon.com/icons/svg/2155/2155227.svg'}>
    
                            </img>
                            <a className='textItemTeacher'>{this.props.dataTeacher !== undefined ? this.props.dataTeacher.name : null}</a>
                        </div>
                    }

                    <div className='titleTeacher'>
                        <a>Students</a>
                        
                        {userProfile.isStaff && 
                        (<a className='buttonAdd' onClick={() => { this.onChangeVisibleAddDialog(true, 2)}}>+</a>)
                        }
                    </div>
                    <div className='lineTitleTeacher'></div>

                    {
                        this.state.dataStudent.length > 0 &&
                        this.state.dataStudent.map(item => {
                            return (
                                <div className='viewItemTeacher'>
                                    {userProfile.isStaff && <a onClick={() => {this.onDeleteUser(item, 1)}} className='deleteIcon'> X </a>}
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