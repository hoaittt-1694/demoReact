import React, { Component } from 'react'
import * as ToDoAPI from '../api/ToDo'

export default class List extends Component {
    constructor() {
        super()
        this.state = {
            id: '',
            title: '',
            editDisabled:false,
            errors: '', 
            items:[]
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    componentDidMount() {
        this.getAll()
    }

    onChange(e) {
        this.setState({
            errors: '',
            [e.target.name]: e.target.value
        })
    }

    getAll() {
        ToDoAPI.getList().then(data => {
            this.setState({
                title: '',
                items: [...data]
            })
        })
    }

    onSubmit(e) {
        e.preventDefault()
        ToDoAPI.addTask(this.state.title).then((data) => {
            console.log(data);
            if (!data.errors) {
                let items = [...this.state.items]
                items.push(data)
                this.setState({
                    title: '',
                    items: items
                })
            } else {
                this.setState({
                    title: '',
                    errors: data.errors.title[0]  ? data.errors.title[0] : data.status
                })
            }
           
        })
    }

    onUpdate(e) {
        e.preventDefault()
        let items = [...this.state.items]
        ToDoAPI.updateTask(this.state.title, this.state.id).then((data) => {  
            if (!data.errors) {
                items.some((item, index) => {
                    if (item.id === data.id) {
                        items[index] = data
                        return true
                    }
                    return false
                })
                this.setState({
                    title: '',
                    items: items,
                    editDisabled: ''
                })
            } else {
                this.setState({
                    title: '',
                    errors: data.errors.title[0]  
                })
            }
            
        })
    }

    onEdit(itemId, e) {
        e.preventDefault()
        let data = [...this.state.items]
        data.forEach((item) => {
            if (item.id === itemId) {
                this.setState({
                    id: item.id,
                    title: item.title,
                    editDisabled: true
                })
            }
        })
    }

    onDelete (val, e) {
        e.preventDefault()
        ToDoAPI.deleteTask(val).then((data)=>{
            let items = [...this.state.items]
            items.some((item, index) => {
                if (item.id === data.id) {
                    items.splice(index, 1)
                    return true
                }
                return false
            })
            this.setState({
                title: '',
                items: items
            })
        })
    }

    render() {
        return (
            <div className="col-md-12">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <div className="row">
                            <div className="form-group col-md-12 has-error">
                                <input type="text" className="form-control" id="title"
                                    name="title" value={this.state.title || ''}
                                    onChange={this.onChange} 
                                />
                                 <label className="text-danger">{this.state.errors}</label>
                            </div>
                        </div>   
                    </div>
                    {!this.state.editDisabled ? (
                        <button type="submit" 
                            className= "btn btn-success btn-block"
                            onClick={this.onSubmit}>
                            Submit
                        </button>
                    ) : (
                        ''
                    )}
                    {this.state.editDisabled ? (
                        <button type="submit"
                            onClick={this.onUpdate.bind(this)}
                            className="btn btn-primary btn-block">
                            Update
                        </button>
                    ) : (
                        ''
                    )}
                </form>
                <table className="table">
                    <tbody>
                        {this.state.items.map((item, index) => (
                            <tr key={index}>
                                <td className="text-left">{item.title}</td>
                                <td className="text-right">
                                <button
                                    className="btn btn-info mr-1"
                                    disabled={this.state.editDisabled}
                                    onClick={this.onEdit.bind(
                                        this,
                                        item.id
                                    )}>
                                    Edit
                                </button>

                                <button
                                    className="btn btn-danger mr-1"
                                    disabled={this.state.editDisabled}
                                    onClick={this.onDelete.bind(
                                        this,
                                        item.id
                                    )}>
                                    Delete
                                </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}
