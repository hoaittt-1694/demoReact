import React, { Component } from 'react';
import {Alert, Button, ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import * as Authentication from "../api/Authentication";

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            notificationMessage: "",
            notificationType: "",
            errors: null
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        Authentication.getProfile().then(res => {
            this.setState({
                name: res.user.name,
                email: res.user.email
            })
        })
    }

    validateForm() {
        return this.state.name.length > 2
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

        Authentication.updateProfile(this.state.name).then((res) => {
            console.log(res);
            if (res.user) {
                this.setState({
                    name: res.user.name,
                    notificationMessage: "Edit profile successful!",
                    notificationType: "success",
                })
            } else {
                this.setState({
                    notificationMessage: "Edit profile failure!",
                    notificationType: "danger",
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
                        <FormGroup controlId="name" bsSize="large">
                            <ControlLabel>Username</ControlLabel>
                            <FormControl
                                autoFocus
                                type="name"
                                name="name"
                                value={this.state.name}
                                onChange={this.onChange}
                            />
                            {this.state.errors ? (
                                <label className="text-danger">{this.state.errors.name}</label>
                            ) : (
                                ''
                            )}
                        </FormGroup>
                        <FormGroup controlId="email" bsSize="large">
                            <ControlLabel>Email</ControlLabel>
                            <FormControl
                                disabled
                                autoFocus
                                name="email"
                                type="email"
                                value={this.state.email}
                                onChange={this.onChange}
                            />
                        </FormGroup>
                        <Button
                            className="btn btn-lg btn-success btn-block"
                            bsSize="large"
                            disabled={!this.validateForm()}
                            type="submit"
                        >
                            Edit
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}
