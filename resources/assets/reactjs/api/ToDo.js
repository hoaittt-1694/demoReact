import axios from 'axios'

export const getList = () => {
    return axios
        .get('/api/tasks')
        .then(response => {
            return response.data
        })
}

export const addTask = title => {
    return axios
        .post('/api/tasks', {
            title: title
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            if (error.status === 422) {
                return error.data
            }
        })
}

export const updateTask = (title, id) => {
    return axios
        .put(`/api/tasks/${id}`, {
            title: title
        })
        .then(response => {
            return response.data
        })
        .catch(error => {
            if (error.status === 422) {
                return error.data
            }
        })
}

export const deleteTask = id => {
    return axios
        .delete(`/api/tasks/${id}`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
}
