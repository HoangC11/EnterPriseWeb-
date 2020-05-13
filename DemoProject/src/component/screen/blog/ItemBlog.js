import React, { Component } from 'react';
import {staffDeleteClassById} from '../../api/apiAdmin'
import {userProfile} from '../config/settings'
import '../../css/BlogComponentCSS.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from 'react-router-dom'
class ItemBlog extends Component {
    async onDeleteClass(id){
        const response = await staffDeleteClassById(id)
        if(response !== undefined){            
            if(response.statusCode === 1){
                alert('Delete success')
                this.props.getAllClass()
            }else{
                alert('Delete failed')
            }
        }else{
            alert('Delete failed')
        }
    }
    render() {
        const { item } = this.props
        const path = '/ClassDetail/' + item.id
        return (
            <div>
                
                <div className='ItemBlog'>
                {(userProfile.isAdmin || userProfile.isStaff) && <button onClick={() => {this.onDeleteClass(item.id)}} type="button" class="btn btn-success">X</button>}
                <Link to={path}  className='linkItem'>
                
                
                
                    <div class='viewTitleBlog'>
                        {/* <img
                            // style={{ width: 200, height: 100 }}
                            className='IconAvatar'
                            src="https://image.flaticon.com/icons/svg/2155/2155227.svg" /> */}
                        
                        <span className='viewTextTitleBlog'>
                            <div style={{}} className='textTitleBlog'>{item.name}</div>
                            <div className='textTitleTeacher'>{item.teacher === undefined ? null : item.teacher.name}</div>
                        </span>

                    </div>
                    {/* <div className='viewLine'></div> */}
                    <div className='colorDescripption'><label className='textDescription'>Giới thiệu: </label>{item.description}</div>
                
            </Link>
            </div>
            </div>
        );
    }
}

export default ItemBlog;