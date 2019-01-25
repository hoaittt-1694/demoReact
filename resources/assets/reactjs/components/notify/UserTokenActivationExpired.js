import React, { Component } from "react"
import {Button, FormGroup, FormControl, ControlLabel, Alert} from "react-bootstrap"
import * as Authentication from '../../api/Authentication'

export default class UserTokenActivationExpired extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            title: "Token activation expired. Please Enter your email to resend active code.",
            errors: null,
            notificationMessage: "",
            notificationType: "",
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    validateForm() {
        return this.state.email.length > 0
    }

    onChange(event) {
        this.setState({
            errors: null,
            [event.target.name]: event.target.value
        })
    }

    onSubmit(event) {
        event.preventDefault()
        Authentication.resendVerifyCode(this.state.email).then((res) => {
            console.log(res)
            if (!res.error) {
                this.setState({
                    email: "",
                    title: "",
                    notification: "Resend verify code success! Please check your email to activate your account",
                    notificationType: "success"
                })
            } else {
                this.setState({
                    errors: res.error
                })
            }
        })
    }

    render() {
        return (
            <div className="Login container">
                <h3 className="text-center" >{this.state.title}</h3>
                {this.state.notification ? (
                    <Alert  bsStyle={this.state.notificationType}>
                        <label>{this.state.notification}</label>
                    </Alert>
                ) : (
                    ''
                )}
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
                            <label className="text-danger">{this.state.errors}</label>
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
                        Send
                    </Button>
                </form>
            </div>
        )
    }
}
