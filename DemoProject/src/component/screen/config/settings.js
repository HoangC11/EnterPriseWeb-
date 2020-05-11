export const userProfile = {
    username: '',
    password: '',
    token: '',
    rule: 1,
    isTeacher: false,
}

export function getDataLocal(){
    var username = localStorage.getItem('username')
    var password = localStorage.getItem('password')
    var token = localStorage.getItem('token')
    var isAdmin = localStorage.getItem('isAdmin')
    var isTeacher = localStorage.getItem('isTeacher')

    userProfile.username = username
    userProfile.password = password
    userProfile.token = token
    userProfile.rule = isAdmin
    userProfile.isTeacher = isTeacher
}

export function saveDataLocal(username, password, token, isAdmin, isTeacher){
    localStorage.setItem('username', username )
    localStorage.setItem('password', password)
    localStorage.setItem('token', token)
    localStorage.setItem('isAdmin', isAdmin)
    localStorage.setItem('isTeacher',isTeacher )
}
export function removeDatalocal(){
    localStorage.removeItem('username')
    localStorage.removeItem('password')
    localStorage.removeItem('token')
    localStorage.removeItem('isAdmin')
    localStorage.removeItem('isTeacher')
}
