import React, { Component } from "react";
import {Button, FormGroup, FormControl, ControlLabel, Alert} from "react-bootstrap";
import * as Authentication from '../../api/Authentication';

export default class UserTokenActivationExpired extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            title: "Token activation expired. Please Enter your email to resend active code.",
            notificationMessage: "",
            notificationType: "",
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    validateForm() {
        return this.state.email.length > 0;
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            notificationMessage: "",
            notificationType: ""
        })
    }

    onSubmit(event) {
        event.preventDefault();
        Authentication.resendVerifyCode(this.state.email).then((res) => {
            this.setState({
                email: "",
                title: "",
            });
            if (res.message === 're_email_activated') {
                this.setState({
                    notificationMessage: "User has active, please login",
                    notificationType: "info"
                })
            } else if (res.error === 'email_not_available') {
                this.setState({
                    notificationMessage: "Sorry, this email is not registered with us, please input correct email",
                    notificationType: "danger"
                })
            } else {
                this.setState({
                    notificationMessage: "You have send successfully verify your email address",
                    notificationType: "success"
                })
            }
        })
    }

    render() {
        return (
            <div className="Login container">
                <h3 className="text-center" >{this.state.title}</h3>
                {this.state.notificationMessage ? (
                    <Alert  bsStyle={this.state.notificationType}>
                        <label>{this.state.notificationMessage}</label>
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
