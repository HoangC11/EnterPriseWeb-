import { userProfile } from '../screen/config/settings'
const API = 'https://classroom1234.herokuapp.com/'
const errorMessage = 'Không thể kết nối tới server'

export async function createClass(name, des, startDate, endDate, time) {
    const api = API + 'admin/class/create'
    const jsonBody = {
        name: name,
        description: des,
        startTime: startDate,
        endTime: endDate,
        time: time
    }
    return await fetch(api, {
        method: 'POST',
        headers: new Headers({
            'Authorization': userProfile.token,
            'Content-Type': 'application/json'
            // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNjQ3ZDZmOWE4MWQ4MDAxNzJhMzQyOSIsIm5hbWUiOiJob2FuZ2hvYSIsImF2YXRhciI6Ii8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvOTY1ZWZhOWVlYzQ4NTIzNTYwOTFiZTEwNDhkMzI5Mjg_cz0yMDAmcj1wZyZkPW1tIiwiaXNUZWFjaGVyIjp0cnVlLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTg0MTEwMjc0LCJleHAiOjE1ODQ5NzQyNzR9.aj_9bwls3AFdhTkrhSQhfch09ZwnC1YbZ8VE1R5QQqk'
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

export async function adminGetAllUser() {
    const api = API + 'admin/user/all'
    return await fetch(api, {
        method: 'GET',
        headers: new Headers({
            'Authorization': userProfile.token
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

export async function adminGetAllProfile() {
    const api = API + 'admin/profile/all'
    return await fetch(api, {
        method: 'GET',
        headers: new Headers({
            'Authorization': userProfile.token
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

export async function adminGetAllClass() {
    const api = API + 'admin/class/all'
    return await fetch(api, {
        method: 'GET',
        headers: new Headers({
            'Authorization': userProfile.token
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


export async function adminAddTeacher(idClass, idTeacher) {
    const api = API + 'admin/class/' + idClass + '/addteacher/' + idTeacher
    return await fetch(api, {
        method: 'POST',
        headers: new Headers({
            'Authorization': userProfile.token
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


export async function adminAddStudent(idClass, idStudent) {
    const api = API + 'admin/class/' + idClass + '/addstudent/' + idStudent
    return await fetch(api, {
        method: 'POST',
        headers: new Headers({
            'Authorization': userProfile.token
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


