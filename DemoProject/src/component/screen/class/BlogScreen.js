import React, { Component } from 'react';
import '../../css/ClassDetailCSS.css'
import { uploadFileBlogApi, sendPostBlogApi, deleteBlogApi } from '../../api/apiUser'
import BlogItem from './BlogItem'
import {userProfile} from '../config/settings'

class BlogScreen extends Component {
    fileInput = null
    constructor(props) {
        super(props)
        this.state = {
            textPost: '',
            idFilePost: '',
            dataBlogs: this.props.dataListBlog,
            file: undefined
        }
    }
    onChangeTextPost(text) {
        this.setState({
            textPost: text
        })
    }
    componentDidMount(){
        this.setState({
            dataBlogs: this.props.dataListBlog
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            if (this.props.dataListBlog !== prevProps.dataListBlog) {
                if (this.props.dataListBlog !== null && this.props.dataListBlog !== undefined) {
                    // if (this.props.dataListBlog.length > 0) {
                    //     this.setState({
                    //         dataBlogs: this.props.dataListBlog,
                    //     })
                    // }
                    this.setState({
                        dataBlogs: this.props.dataListBlog,
                    })
                }
            }
        }
    }
    onChangeImagePostBlog = async (event) => {
        const response = await uploadFileBlogApi(event.target.files[0])
        if (response !== undefined) {
            if (response.status === 200) {
                if (response.data.statusCode === 1) {
                    this.setState({
                        idFilePost: response.data.data.url
                    })
                }
            }
        }
    }
    async onClickSendPostBlog(textPost, idFile, idClass) {
        const response = await sendPostBlogApi(textPost, idFile, idClass)
        if (response !== undefined) {
            if (response.statusCode === 1) {
                this.setState({
                    textPost: '',
                    idFilePost: '',
                })
                this.fileInput.value = null
                this.props.getListBlog()
            }
        }
    }

     onDeleteBlog = async (item) => {
        const response =  await deleteBlogApi(this.props.idClass, item._id)
        if (response !== undefined) {
            if (response.statusCode === 1) {
                alert(response.message)
                this.props.getListBlog()
            }else{
                alert(response.message)
            }
        }else{
            alert('Delete Failed ')
        }
    }

    render() {
        const { idClass } = this.props
        return (
            <div className='header'>
                <div className='viewPostBlog'>
                    <div>
                        <img
                            className='avatarItemTeacher'
                            src='https://image.flaticon.com/icons/svg/2155/2155227.svg'>
                        </img>
                        <a className='styleChooseImage'>
                            {/* <img
                                className='avatarItemTeacher'
                                src='https://image.flaticon.com/icons/svg/485/485907.svg'>
                            </img>
                            <a> Chọn ảnh</a> */}
                            <input type='file' onChange={this.onChangeImagePostBlog} ref={ref => this.fileInput = ref} />
                        </a>
                        <div className='viewPostInput'>
                            <textarea placeholder='Enter the content of the post' value={this.state.textPost} className='stylePostInput' onChange={event => this.onChangeTextPost(event.target.value)}></textarea>
                            {/* <div className='divIconSendPost'>
                                
                            </div> */}
                            <img
                                onClick={() => { this.onClickSendPostBlog(this.state.textPost, this.state.idFilePost, idClass) }}
                                className='styleIconSendPost'
                                src='https://image.flaticon.com/icons/svg/736/736110.svg'>
                            </img>
                        </div>

                    </div>
                </div>
                {this.state.dataBlogs.map(item => {
                    return <BlogItem item={item} onDeleteBlog={this.onDeleteBlog} {...this.props} />
                })}
            </div>
        );
    }
}

export default BlogScreen;