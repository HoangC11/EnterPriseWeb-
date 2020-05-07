import { userProfile } from '../screen/config/settings'
import axios from 'axios'
const API = 'https://classroom1234.herokuapp.com/'
const errorMessage = 'Không thể kết nối tới server'

export async function getClasses() {
    const api = API + 'classes'
    return await fetch(api, {
        method: 'GET',
        headers: new Headers({
            'Authorization': userProfile.token
            // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNjQ3ZDZmOWE4MWQ4MDAxNzJhMzQyOSIsIm5hbWUiOiJob2FuZ2hvYSIsImF2YXRhciI6Ii8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvOTY1ZWZhOWVlYzQ4NTIzNTYwOTFiZTEwNDhkMzI5Mjg_cz0yMDAmcj1wZyZkPW1tIiwiaXNUZWFjaGVyIjp0cnVlLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTg0MTEwMjc0LCJleHAiOjE1ODQ5NzQyNzR9.aj_9bwls3AFdhTkrhSQhfch09ZwnC1YbZ8VE1R5QQqk'
        }),
    })
        .then(response => response.json())
        .catch(err => {
            return {
                statusCode: -1,
                message: errorMessage
            }
        })
}

export async function getAllClasses() {
    const api = API + 'admin/class/all'
    return await fetch(api, {
        method: 'GET',
        headers: new Headers({
            'Authorization': userProfile.token
            // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNjQ3ZDZmOWE4MWQ4MDAxNzJhMzQyOSIsIm5hbWUiOiJob2FuZ2hvYSIsImF2YXRhciI6Ii8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvOTY1ZWZhOWVlYzQ4NTIzNTYwOTFiZTEwNDhkMzI5Mjg_cz0yMDAmcj1wZyZkPW1tIiwiaXNUZWFjaGVyIjp0cnVlLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTg0MTEwMjc0LCJleHAiOjE1ODQ5NzQyNzR9.aj_9bwls3AFdhTkrhSQhfch09ZwnC1YbZ8VE1R5QQqk'
        }),
    })
        .then(response => response.json())
        .catch(err => {
            return {
                statusCode: -1,
                message: errorMessage
            }
        })
}

export async function getAllMemberInClass(idClass) {
    const api = API + 'classes/' + idClass + '/members'
    return await fetch(api, {
        method: 'GET',
        headers: new Headers({
            'Authorization': userProfile.token
            // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNjQ3ZDZmOWE4MWQ4MDAxNzJhMzQyOSIsIm5hbWUiOiJob2FuZ2hvYSIsImF2YXRhciI6Ii8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvOTY1ZWZhOWVlYzQ4NTIzNTYwOTFiZTEwNDhkMzI5Mjg_cz0yMDAmcj1wZyZkPW1tIiwiaXNUZWFjaGVyIjp0cnVlLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTg0NTk2NDQ1LCJleHAiOjE1ODU0NjA0NDV9.MT3RWk68oM0elmiMj6VpO4DJEImZSpHQuSzt2nP7hZA'
        }),
    })
        .then(response => response.json())
        .catch(err => {
            return {
                statusCode: -1,
                message: errorMessage
            }
        })
}

export async function adminGetAllMemberInClass(idClass) {
    const api = API + 'admin/class/'+idClass+'/members'
    return await fetch(api, {
        method: 'GET',
        headers: new Headers({
            'Authorization': userProfile.token
            // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNjQ3ZDZmOWE4MWQ4MDAxNzJhMzQyOSIsIm5hbWUiOiJob2FuZ2hvYSIsImF2YXRhciI6Ii8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvOTY1ZWZhOWVlYzQ4NTIzNTYwOTFiZTEwNDhkMzI5Mjg_cz0yMDAmcj1wZyZkPW1tIiwiaXNUZWFjaGVyIjp0cnVlLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTg0NTk2NDQ1LCJleHAiOjE1ODU0NjA0NDV9.MT3RWk68oM0elmiMj6VpO4DJEImZSpHQuSzt2nP7hZA'
        }),
    })
        .then(response => response.json())
        .catch(err => {
            return {
                statusCode: -1,
                message: errorMessage
            }
        })
}


export async function getListBlogInClass(idClass) {
    const api = API + 'classes/' + idClass
    return await fetch(api, {
        method: 'GET',
        headers: new Headers({
            'Authorization': userProfile.token
            // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNjQ3ZDZmOWE4MWQ4MDAxNzJhMzQyOSIsIm5hbWUiOiJob2FuZ2hvYSIsImF2YXRhciI6Ii8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvOTY1ZWZhOWVlYzQ4NTIzNTYwOTFiZTEwNDhkMzI5Mjg_cz0yMDAmcj1wZyZkPW1tIiwiaXNUZWFjaGVyIjp0cnVlLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTg0ODc4MTI3LCJleHAiOjE1ODU3NDIxMjd9.Rg6NvPzzwiVyr9g75qhTcH3tM8_-SSJpn6kpwXU1DWM'
        }),
    })
        .then(response => response.json())
        .catch(err => {
            return {
                statusCode: -1,
                message: errorMessage
            }
        })
}

// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNjQ3ZDZmOWE4MWQ4MDAxNzJhMzQyOSIsIm5hbWUiOiJob2FuZ2hvYSIsImF2YXRhciI6Ii8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvOTY1ZWZhOWVlYzQ4NTIzNTYwOTFiZTEwNDhkMzI5Mjg_cz0yMDAmcj1wZyZkPW1tIiwiaXNUZWFjaGVyIjp0cnVlLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTg1MDYxMzQ3LCJleHAiOjE1ODU5MjUzNDd9.VBjmoO4LP4BcDalO02V5DDpgYb96bPzoLGydPkxSltM


export async function uploadFileBlogApi(file, classId) {
    const api = API + 'classes/' + '5e63d232b69d622dd0c1cd54' + '/upload'
    //5e63d232b69d622dd0c1cd54
    // const api = 'https://classroom1234.herokuapp.com/classes/5e63d232b69d622dd0c1cd54/upload'
    const fd = new FormData()
    fd.append('myFile', file)
    const config = {
        headers: {
            'Authorization': userProfile.token,
            'Content-Type': 'multipart/form-data'
        }
    }
    const result = await axios.post(api, fd, config).then(response => {
        return response
    }).catch(error => {
        return error
    })
    return result

}

export async function sendCommentPostApi(comment, idPost) {
    const api = API + 'comments'
    const jsonBody = {
        text: comment,
        idPost
    }
    return await fetch(api, {
        method: 'POST',
        headers: new Headers({
            'Authorization': userProfile.token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(jsonBody)
    })
        .then(response => response.json())
        .catch(err => {
            return {
                statusCode: -1,
                message: errorMessage
            }
        })
}

export async function sendPostBlogApi(text, idFile, idClass) {
    const api = API + 'classes/' + idClass
    const jsonBody = {
        text,
        image: idFile
    }
    return await fetch(api, {
        method: 'POST',
        headers: new Headers({
            'Authorization': userProfile.token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(jsonBody)
    })
        .then(response => response.json())
        .catch(err => {
            return {
                statusCode: -1,
                message: errorMessage
            }
        })
}

export async function forGotPassword(email) {
    const api = API + 'users/forgot'
    const body = {
        gmail: email
    }
    return await fetch(api, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .catch(err => {
            return {
                statusCode: -1,
                message: errorMessage
            }
        })
}