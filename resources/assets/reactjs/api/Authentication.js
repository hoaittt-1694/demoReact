import axios from 'axios'

export const registerUser = (user) => {
    return axios.post('/api/register', user)
        .then(response => {
            return response.data
        })
        .catch(error => {
            if (error.status === 422) {
                return error.data
            }
        })
}

export const loginUser = (user) => {
    axios.post('/api/login', user)
        .then(response => {
            return response.data
        })
        .catch(error => {
            return error
        })
}
