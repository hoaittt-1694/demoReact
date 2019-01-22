import axios from 'axios'

export const registerUser = (user) => {
    return axios
        .post('/api/register', user, {
            headers: {'Content-Type': 'application/json'}
        })
        .then(response => {
            return response.data
        })
        .catch(error => {
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
            return response.data
        })
        .catch(error => {
            return error
        })
}

export const getProfile = () => {
    return axios
        .get('/api/profile', {
            headers: { Authorization: `Bearer ${localStorage.usertoken}`}
        })
        .then(response => {
            return response.data
        })
        .catch(error => {
            return error
        })
}
