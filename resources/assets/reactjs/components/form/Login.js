import React, { Component } from "react"
import {Button, FormGroup, FormControl, ControlLabel, Alert} from "react-bootstrap"
import * as Authentication from '../../api/Authentication'

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            notificationMessage: "",
            notificationType: "",
            errors: null
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0
    }

    onChange(event) {
        this.setState({
            errors: null,
            notificationMessage: "",
            notificationType: "",
            [event.target.name]: event.target.value
        })
    }

    onSubmit(event) {
        event.preventDefault()
        const user = {
            email: this.state.email,
            password: this.state.password,
        }

        Authentication.loginUser(user).then((res) => {
            if (res.token) {
                this.props.history.push(`/home`)
            } else {
                if(res.error === 'email_is_not_activated') {
                    this.props.history.push('/resend-verify')
                } else if (res.error === 'invalid_credentials') {
                   this.setState({
                       notificationMessage: "Email or password invalid!",
                       notificationType: "danger",
                   })
                } else {
                    this.setState({
                        errors: res.errors
                    })
                }
            }
        })
    }

    render() {
        return (
            <div className="container">
                {this.state.notificationMessage ? (
                    <Alert  bsStyle={this.state.notificationType}>
                        <label className="text-center">{this.state.notificationMessage}</label>
                    </Alert>
                ) : (
                    ''
                )}
                <div className="Login container">
                    <form onSubmit={this.onSubmit}>
                        <FormGroup controlId="email" bsSize="large">
                            <ControlLabel>Email</ControlLabel>
                            <FormControl
                                autoFocus
                                type="email"
                                name="email"
                                placeholder="Enter Email"
                                value={this.state.email}
                                onChange={this.onChange}
                            />
                            {this.state.errors ? (
                                <label className="text-danger">{this.state.errors.email}</label>
                            ) : (
                                ''
                            )}
                        </FormGroup>
                        <FormGroup controlId="password" bsSize="large">
                            <ControlLabel>Password</ControlLabel>
                            <FormControl
                                autoFocus
                                name="password"
                                type="password"
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
                        <Button
                            className= "btn btn-lg btn-success btn-block"
                            bsSize="large"
                            disabled={!this.validateForm()}
                            type="submit"
                        >
                            Login
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}
