import axios from 'axios'

export const registerUser = (user) => {
    return axios.post('/api/register', user)
        .then(response => {
            return response.data
        })
        .catch(error => {
            return error
        })
}

export const loginUser = (user) => {
    return axios.post('/api/login', user)
        .then(response => {
            return response.data
        })
        .catch(error => {
            return error.data
        })
}
