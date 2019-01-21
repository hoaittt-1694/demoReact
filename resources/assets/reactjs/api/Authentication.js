import axios from 'axios'

export const registerUser = (user) => {
    return axios
        .post('/api/register', user, {
                headers: {'Content-Type': 'application/json'}
        })
        .then(response => {
            console.log(response)
            return response.data
        })
        .catch(error => {
            console.log(error)
            return error
        })
}

export const loginUser = (user) => {
    return axios
        .post('/api/login', user, {
            headers: {'Content-Type': 'application/json'}
        })
        .then(response => {
            localStorage.setItem('usertoken', response.data.token)
            console.log(response)
            return response.data
        })
        .catch(error => {
            console.log(error)
            return error
        })
}

export const getProfile = () => {
    return axios
        .post('/api/profile', {
                headers: { Authorization: `Bearer ${localStorage.usertoken}`}
        })
        .then(response => {
            console.log(response)
            return response.data
        })
        .catch(error => {
            console.log(error)
            return error
        })
}
