import React, { Component } from 'react'
import { updateProfile } from '../api/Authentication';
import {Alert, Button, ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import * as Authentication from "../api/Authentication";

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            email: "",
            notificationMessage: "",
            notificationType: "",
            errors: null
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    validateForm() {
        return this.state.name.length > 0
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

        Authentication.loginUser(this.state.name).then((res) => {
            console.log(res);
            // if (res.user) {
            //     this.props.history.push(`/home`)
            // } else {
            //     if(res.error === 'email_is_not_activated') {
            //         this.props.history.push('/resend-verify')
            //     } else if (res.error === 'invalid_credentials') {
            //         this.setState({
            //             notificationMessage: "Email or password invalid!",
            //             notificationType: "danger",
            //         })
            //     } else {
            //         this.setState({
            //             errors: res.errors
            //         })
            //     }
            // }
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
                                autoFocus
                                name="email"
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
                        <Button
                            className="btn btn-lg btn-success btn-block"
                            bsSize="large"
                            disabled={!this.validateForm()}
                            type="submit"
                        >
                            Update
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}
