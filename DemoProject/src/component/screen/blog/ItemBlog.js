import React, { Component } from 'react';
import '../../css/BlogComponentCSS.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from 'react-router-dom'
class ItemBlog extends Component {
    render() {
        const { item } = this.props
        const path = '/ClassDetail/' + item.id
        return (
            <Link to={path}  className='linkItem'>
                <div className='ItemBlog'>
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
                </div>
            </Link>
        );
    }
}

export default ItemBlog;