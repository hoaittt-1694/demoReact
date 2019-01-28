import axios from 'axios';
import Auth from '../service/Auth';

export const getList = () => {
    return axios
        .get('/api/tasks', {
            headers: { Authorization: `Bearer ${Auth.getToken()}`}
        })
        .then(response => {
            return response.data
        })
};

export const addTask = title => {
    return axios
        .post('/api/tasks', {
            title: title
        }, {
            headers: { Authorization: `Bearer ${Auth.getToken()}`}
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            if (error.status === 422) {
                return error.data
            }
        })
};

export const updateTask = (title, id) => {
    return axios
        .put(`/api/tasks/${id}`, {
            title: title
        }, {
            headers: { Authorization: `Bearer ${Auth.getToken()}`}
        })
        .then(response => {
            return response.data
        })
        .catch(error => {
            if (error.status === 422) {
                return error.data
            }
        })
};

export const deleteTask = id => {
    return axios
        .delete(`/api/tasks/${id}`, {
            headers: { Authorization: `Bearer ${Auth.getToken()}`}
        })
        .then(response => {
            return response.data
        })
        .catch(error => {
            return error
        })
};
