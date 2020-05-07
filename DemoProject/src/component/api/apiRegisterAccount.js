const API = 'https://classroom1234.herokuapp.com/'

const errorMessage = 'Không thể kết nối tới server'

export async function registerAccountApi(username, password, passwordCfm, email, code) {
    const api = API + 'users/register'
    const bodyJson = {
        name: username,
        password: password,
        passwordCfm: passwordCfm,
        gmail: email,
        secretCode: code
    }
    return await fetch(api, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(bodyJson)
    })
        .then(response => response.json())
        .catch(err => {
            return {
                statusCode: -1,
                message: errorMessage
            }
        })
}