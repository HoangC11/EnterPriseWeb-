import React, { Component } from 'react';
import '../../css/ClassDetailCSS.css'
import { sendCommentPostApi } from '../../api/apiUser'
import {userProfile} from '../config/settings'
class BlogItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            textComment: '',
            showComment: false,
        }
    }
    onChangeTextComment(text) {
        this.setState({
            textComment: text
        })
    }
    changeShowComments(visible) {
        this.setState({
            showComment: visible
        })
    }
    async sendCommentPost(comment, idPost) {
        const response = await sendCommentPostApi(comment, idPost)
        if (response !== undefined) {
            if (response.statusCode === 1) {
                this.setState({
                    textComment: ''
                })
                this.props.getListBlog()
            }
        }
    }
    async apiDeleteComment(idComment){
        const api = 'https://classroom1234.herokuapp.com/' + 'comments/' + idComment
        return await fetch(api, {
            method: 'DELETE',
            headers: new Headers({
                'Authorization': userProfile.token
                // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNjQ3ZDZmOWE4MWQ4MDAxNzJhMzQyOSIsIm5hbWUiOiJob2FuZ2hvYSIsImF2YXRhciI6Ii8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvOTY1ZWZhOWVlYzQ4NTIzNTYwOTFiZTEwNDhkMzI5Mjg_cz0yMDAmcj1wZyZkPW1tIiwiaXNUZWFjaGVyIjp0cnVlLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTg0MTEwMjc0LCJleHAiOjE1ODQ5NzQyNzR9.aj_9bwls3AFdhTkrhSQhfch09ZwnC1YbZ8VE1R5QQqk'
            }),
        })
            .then(response => response.json())
            .catch(err => {
                return {
                    statusCode: -1,
                    message: 'Không thể kết nối tới server'
                }
            })
    }
    async onDeleteComment(idComment){
        const response = await this.apiDeleteComment(idComment)
        if(response !== undefined){
            if(response.statusCode === 1){
                alert('Xóa thành công')
                this.props.getListBlog()
            }else{
                alert('Bạn không thể xóa comment này !')
            }
        }else{
            alert('Bạn không thể xóa comment này !')
        }
    }
    
    render() {
        const { item } = this.props
        return (
            <div className='viewBlogItem'>
                <div className='viewContentBlogItem'>
                    <a onClick={() => { this.props.onDeleteBlog(item) }}> X </a>
                    <img
                        className='avatarItemTeacher'
                        src='https://image.flaticon.com/icons/svg/2155/2155227.svg'>
                    </img>
                    <a className='textAuthorBlogItem'>{item.author}</a>
                    <div className='viewLineTitleBlogItem' />
                    <a className='textContentBlogItem'>{item.text}</a>
                    {item.image !== undefined && item.image !== '' &&
                        (
                            <div><a href={'https://drive.google.com/uc?id=' + item.image} target='_blank' download>Tải file đính kèm</a></div>
                        )
                    }
                    <div className='viewLineTextContentBlogItem' />
                    <a className='textTitleCommentBlogItem'>Nhận xét của lớp học</a>
                    {item.comments.length > 0 && !this.state.showComment &&
                        <p onClick={() => { this.changeShowComments(true) }}>Hiện {item.comments.length} bình luận</p>
                    }
                    {item.comments.length > 0 && this.state.showComment &&
                        <div className='viewListCommentBlog'>
                            {item.comments.map(item => {
                                return (
                                    <div className='viewItemCommentBlog'>
                                    <a onClick={() => {this.onDeleteComment(item._id)}} className='deleteComment'>Xóa</a>
                                        <div className='textAuthor'>{item.author}   </div>
                                        
                                        <div>{item.text}</div>
                                    </div>
                                )
                            })}
                            <p onClick={() => { this.changeShowComments(false) }}>Ẩn bình luận</p>
                        </div>

                    }
                    <div className='viewAuthorCommentBlog'>
                        <img
                            className='avatarItemTeacher'
                            src='https://image.flaticon.com/icons/svg/2155/2155227.svg'>
                        </img>
                        <input placeholder='Nhập bình luận của bạn' type='text' value={this.state.textComment} className='viewInputCommentBlog' onChange={(event) => { this.onChangeTextComment(event.target.value) }}></input>
                        <img
                            onClick={() => { this.sendCommentPost(this.state.textComment.trim(), item._id) }}
                            className='styleIconSendPost'
                            src='https://image.flaticon.com/icons/svg/736/736110.svg'>
                        </img>
                    </div>
                </div>
            </div>
        );
    }
}

export default BlogItem;