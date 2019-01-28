import axios from 'axios';
import Auth from '../service/Auth';

export const registerUser = (user) => {
    return axios
        .post('/api/register', user, {
            headers: {'Content-Type': 'application/json'}
        })
        .then(response => {
            return response.data
        })
        .catch(error => {
            return error.data
        })
};

export const loginUser = (user) => {
    return axios
        .post('/api/login', user, {
            headers: {'Content-Type': 'application/json'}
        })
        .then(response => {
            Auth.authenticateUser(response.data.token);
            return response.data
        })
        .catch(error => {
            return error.data
        })
};

export const getProfile = () => {
    return axios
        .get('/api/profile', {
            headers: { Authorization: `Bearer ${Auth.getToken()}`}
        })
        .then(response => {
            return response.data
        })
        .catch(error => {
            return error.data
        })
};

export const updateProfile = (name) => {
    const postData = {name};
    return axios
        .put('/api/profile', postData, {
            headers: { Authorization: `Bearer ${Auth.getToken()}`}
        })
        .then(response => {
            return response.data
        })
        .catch(error => {
            return error
        })
};

export const resendVerifyCode = (email) => {
    const postData = {email};
    return axios
        .post('api/user/activation', postData, {
            headers: {'Content-Type': 'application/json'}
        })
        .then(response => {
            return response.data
        })
        .catch(error => {
            return error.data
        })
};
