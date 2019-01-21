import React, { Component } from "react"
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap"
import * as Authentication from '../../api/Authentication'

export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            email: "",
            password: "",
            password_confirm: '',
            error: ""
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.dismissError = this.dismissError.bind(this)
    }

    dismissError() {
        this.setState({ error: '' })
    }

    validateForm() {
        return this.state.name.length > 0 && this.state.email.length > 0 && this.state.password.length > 0
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirm: this.state.password_confirm
        }

        Authentication.registerUser(user).then((data) => {
            if (data.status !== 400) {
                this.props.history.push("/login")
            } else {
               console.log(data)
            }
        })
    }

    render() {
        return (
            <div className="Register">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup bsSize="large">
                        <ControlLabel>Username</ControlLabel>
                        <FormControl
                            autoComplete="off"
                            id="name-input"
                            name="name"
                            className="center-block"
                            placeholder="Name"
                            autoFocus
                            type="text"
                            value={this.state.name}
                            onChange={this.handleInputChange}
                        />
                    </FormGroup>
                    <FormGroup bsSize="large">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            autoComplete="off"
                            id="email-input"
                            name="email"
                            className="center-block"
                            placeholder="Email"
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={this.handleInputChange}
                        />
                    </FormGroup>
                    <FormGroup bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            autoComplete="off"
                            id="password-input"
                            name="password"
                            className="center-block"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            type="password"
                        />
                    </FormGroup>
                    <FormGroup bsSize="large">
                        <ControlLabel>Password Confirm</ControlLabel>
                        <FormControl
                            autoComplete="off"
                            id="password-confirm-input"
                            name="password_confirm"
                            className="center-block"
                            placeholder="Confirm Password"
                            value={this.state.password_confirm}
                            onChange={this.handleInputChange}
                            type="password"
                        />
                    </FormGroup>
                    <Button
                        className= "btn btn-success btn-block"
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        Register User
                    </Button>
                </form>
            </div>
        )
    }
}
