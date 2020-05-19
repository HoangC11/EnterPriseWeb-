import { userProfile } from '../screen/config/settings'
const API = 'https://classroom1234.herokuapp.com/'
const errorMessage = 'Không thể kết nối tới server'

export async function createClass(name, des, startDate, endDate, time) {
    const api = API + 'staff/class/create'
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
    const api = API + 'staff/user/all'
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

export async function adminGetAllStudentNotJoinClass(idClass) {
    const api = API + 'staff/' + idClass + '/user/allstudents '
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

export async function adminGetAllTeacherNotJoinClass(idClass) {
    const api = API + 'staff/' + idClass + '/user/allteachers '
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
    const api = API + 'staff/profile/all'
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
    const api = API + 'staff/class/all'
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
    const api = API + 'staff/class/' + idClass + '/addteacher/' + idTeacher
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
    const api = API + 'staff/class/' + idClass + '/addstudent/' + idStudent
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


// management

export async function managerGetAllUser() {
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

export async function managerGetProfileAllUser() {
    const api = API + 'admin/profile/all/'
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

export async function managerGetProfileById(id) {
    const api = API + 'admin/profile/' + id
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

export async function managerAddUser(name, gmail, password, isTeacher, isStaff) {
    const api = API + 'admin/user/add'
    const jsonBody ={ 
        name,
        gmail,
        password,
        isTeacher, 
        isStaff
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

export async function managerChangeRuleStaff(id) {
    const api = API + 'admin/changerole/staff/' + id
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

export async function managerChangeRuleTeacher(id) {
    const api = API + 'admin/changerole/teacher/' + id
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


export async function managerRemoveUser(id) {
    const api = API + 'admin/user/remove/' + id
    return await fetch(api, {
        method: 'DELETE',
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

export async function managerGetUserProfile(id) {
    const api = API + 'admin/profile/' + id
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


// staff

export async function staffGetAllUser() {
    const api = API + 'staff/user/all'
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


export async function staffDeleteClassById(id) {
    const api = API + 'staff/class/' + id
    return await fetch(api, {
        method: 'DELETE',
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

export async function staffDeleteUserByClass(idClass, idUser) {
    const api = API + 'staff/class/' + idClass + '/remove/' + idUser
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

export async function staffAddManyStudents(idClass, arrayStudents) {
    const api = API + 'staff/class/' + idClass + '/addstudents'
    let str = ''
    let index = 0
    for(let item of arrayStudents){
        if(index === 0){
            str +=item
            index ++
        }else{
            str +=  ',' + item
        }
    }
    let body = {
        idUser: str
    }
    return await fetch(api, {
        method: 'POST',
        headers: new Headers({
            'Authorization': userProfile.token,
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