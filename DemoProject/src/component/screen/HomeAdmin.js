import React, { Component } from 'react';
import { getClasses, getAllClasses } from '../api/apiUser'
import { createClass } from '../api/apiAdmin'
import ItemBlog from './blog/ItemBlog'
import '../css/HomeUserCSS.css'
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
    async getAllClass(){
        const response = await getAllClasses()
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
                                                return (<td className='TableTdItem'><ItemBlog item={value} /></td>)
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
    componentDidMount() {
        this.getAllClass()
    }
    onAddClass(visible) {

        this.setState({
            visibleAddClassDialog: visible
        })
    }
    onClickAddClass = async () => {
        const { addNameClass, addDesClass, addStartDate, addEndDate, addTimeClass } = this.state
        if (addNameClass.trim() === '') {
            alert('Vui lòng nhập tên lớp học !')
        } else if (addDesClass.trim() === '') {
            alert('Vui lòng nhập nội dung giới thiệu về lớp học !')
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
        return (
            <div className='divBody'>
                {this.state.visibleAddClassDialog &&
                    <div>
                        <div onClick={() => { this.onAddClass(false) }} className='divAddClassDialog'>

                        </div>
                        <div className='divTitleDialog'>
                            <a className='textTitleAddClassDialog'>Thêm lớp học</a>
                            <div>
                                <a>Tên lớp học: </a>
                                <input type='text' onChange={(event) => {
                                    this.setState({
                                        addNameClass: event.target.value
                                    })
                                }} />
                            </div>
                            <div>
                                <a>Giới thiệu: </a>
                                <input type='text' onChange={(event) => {
                                    this.setState({
                                        addDesClass: event.target.value
                                    })
                                }} />
                            </div>
                            <div>
                                <a>Ngày bắt đầu: </a>
                                <input type='date' value={this.state.addStartDate} onChange={(event) => {
                                    this.setState({
                                        addStartDate: event.target.value
                                    })
                                }} />
                            </div>
                            <div>
                                <a>Ngày kết thúc: </a>
                                <input type='date' value={this.state.addEndDate} onChange={(event) => {
                                    this.setState({
                                        addEndDate: event.target.value
                                    })
                                }} />
                            </div>
                            <div>
                                <a>Thời gian: </a>
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
                    <img src='https://image.flaticon.com/icons/svg/813/813670.svg' className='iconHome' />
                    <a className='titleScreen'>HOME ADMIN</a>
                    <img 
                    onClick={() => this.setState({
                        goToScreen: 'LoginAdmin'
                    })}
                    src='https://image.flaticon.com/icons/svg/527/527471.svg' className='iconLogout' ></img>
                </div>
                <div className='headerLineBotton'></div>
                <a className='textTitleClass'>Lớp học</a>
                <div className='divTitleClass'>
                    {/* <a className='textTitlePeople'>All People</a> */}
                    <a onClick={() => { this.onAddClass(true) }} className='textAddClass'>Thêm lớp học + </a>
                </div>
                <div style={{}} className='ListItem'>

                    <table className='TableItem'>
                        {this.state.renderData}
                    </table>

                    {this.state.goToScreen === 'LoginAdmin' &&
                            <Redirect to={{ pathname: 'LoginAdmin' }} />
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