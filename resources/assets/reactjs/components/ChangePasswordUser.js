import React, { Component } from 'react';
import {Alert, Button, ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import * as Authentication from "../api/Authentication";

export default class ChangePasswordUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            old_password: "",
            new_password: "",
            new_password_confirm: "",
            notificationMessage: "",
            notificationType: "",
            errors: null
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    validateForm() {
        return this.state.old_password.length >= 6
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
        event.preventDefault();

        Authentication.changePassword(this.state.old_password, this.state.new_password, this.state.new_password_confirm).then((res) => {
            if (res.user) {
                this.setState({
                    notificationMessage: "Change password successful",
                    notificationType: "success",
                })
            } else {
                this.setState({
                    errors: res.errors
                })
            }   
        })
    }

    render() {
        return (
            <div className="container">
                {this.state.notificationMessage ? (
                    <Alert bsStyle={this.state.notificationType}>
                        <label className="text-center">{this.state.notificationMessage}</label>
                    </Alert>
                ) : (
                    ''
                )}
                <div className="Register container">
                    <form onSubmit={this.onSubmit}>
                        <FormGroup controlId="old_password" bsSize="large">
                            <ControlLabel>Old Password</ControlLabel>
                            <FormControl
                                autoFocus
                                type="password"
                                name="old_password"
                                value={this.state.old_password}
                                onChange={this.onChange}
                            />
                            {this.state.errors && this.state.errors.old_password ? (
                                <label className="text-danger">{this.state.errors.old_password}</label>
                            ) : (
                                ''
                            )}
                        </FormGroup>
                        <FormGroup controlId="new_password" bsSize="large">
                            <ControlLabel>New Password</ControlLabel>
                            <FormControl
                                autoFocus
                                type="password"
                                name="new_password"
                                value={this.state.newPass}
                                onChange={this.onChange}
                            />
                            {this.state.errors && this.state.errors.new_password ? (
                                <label className="text-danger">{this.state.errors.new_password}</label>
                            ) : (
                                ''
                            )}
                        </FormGroup>
                        <FormGroup controlId="new_password_confirm" bsSize="large">
                            <ControlLabel>Confirm Password</ControlLabel>
                            <FormControl
                                autoFocus
                                name="new_password_confirm"
                                type="password"
                                value={this.state.new_password_confirm}
                                onChange={this.onChange}
                            />
                            {this.state.errors && this.state.errors.new_password_confirm ? (
                                <label className="text-danger">{this.state.errors.new_password_confirm}</label>
                            ) : (
                                ''
                            )}
                        </FormGroup>
                        <Button
                            className="btn btn-lg btn-success btn-block"
                            bsSize="large"
                            disabled={!this.validateForm()}
                            type="submit"
                        >
                            Change Password
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}
