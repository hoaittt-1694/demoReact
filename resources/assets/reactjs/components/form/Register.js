import React, { Component } from "react"
import { Button, FormGroup, FormControl, ControlLabel, Alert } from "react-bootstrap"
import * as Authentication from '../../api/Authentication'

export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            notificationMessage: "",
            notificationType: "",
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    validateForm() {
        return this.state.name.length > 0 && this.state.email.length > 0
            && this.state.password.length > 0 && this.state.password_confirm.length > 0
    }

    onChange(event) {
        this.setState({
            errors: null,
            [event.target.name]: event.target.value
        })
    }

    onSubmit(event) {
        event.preventDefault()
            const newUser = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                password_confirm: this.state.password_confirm
            }

            Authentication.registerUser(newUser).then((res) => {
                if (res.user) {
                    this.setState({
                        email: "",
                        password: "",
                        password_confirm: "",
                        notification: "Register success! Please check your email to activate your account",
                        notificationType: "success"
                    })
                } else {
                    this.setState({
                        errors: res.errors,
                        notification: "Register user fail",
                        notificationType: "danger"
                    })
                }
            })
    }

    render() {
        return (
            <div className="Register">
                {this.state.notification ? (
                    <Alert  bsStyle={this.state.notificationType}>
                        <label>{this.state.notification}</label>
                    </Alert>
                ) : (
                    ''
                )}

                <form onSubmit={this.onSubmit}>
                    <FormGroup bsSize="large">
                        <ControlLabel>Username</ControlLabel>
                        <FormControl
                            id="name-input"
                            name="name"
                            className="center-block"
                            placeholder="Enter User Name"
                            autoFocus
                            type="text"
                            value={this.state.name}
                            onChange={this.onChange}
                        />
                        {this.state.errors ? (
                            <label className="text-danger">{this.state.errors.name}</label>
                        ) : (
                            ''
                        )}
                    </FormGroup>
                    <FormGroup bsSize="large">
                        <ControlLabel>Email Address</ControlLabel>
                        <FormControl
                            id="email-input"
                            name="email"
                            className="center-block"
                            placeholder="Enter Email"
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={this.onChange}
                        />
                        {this.state.errors ? (
                            <label className="text-danger">{this.state.errors.email}</label>
                        ) : (
                            ''
                        )}
                    </FormGroup>
                    <FormGroup bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            id="password-input"
                            name="password"
                            type="password"
                            className="center-block"
                            placeholder="Enter Password"
                            value={this.state.password}
                            onChange={this.onChange}
                        />
                        {this.state.errors ? (
                            <label className="text-danger">{this.state.errors.password}</label>
                        ) : (
                            ''
                        )}
                    </FormGroup>
                    <FormGroup bsSize="large">
                        <ControlLabel>Password Confirm</ControlLabel>
                        <FormControl
                            id="password-confirm-input"
                            name="password_confirm"
                            type="password"
                            className="center-block"
                            placeholder="Confirm Password"
                            value={this.state.password_confirm}
                            onChange={this.onChange}
                        />
                        {this.state.errors ? (
                            <label className="text-danger">{this.state.errors.password_confirm}</label>
                        ) : (
                            ''
                        )}
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
