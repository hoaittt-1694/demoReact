import React, { Component } from "react"
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap"
import * as Authentication from '../../api/Authentication'

export default class Register extends Component {
    constructor() {
        super()
        this.state = {
            name: "",
            nameError: "",
            email: "",
            emailError: "",
            password: "",
            passwordError: "",
            password_confirm: "",
            password_confirmError: "",
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    validateForm() {
        return this.state.name.length > 0 && this.state.email.length > 0 && this.state.password.length > 0
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    validate = () => {
        let isError = false
        const errors = {
            nameError: "",
            emailError: "",
            passwordError: "",
            password_confirmError: ""
        };
        if (this.state.name.length > 255) {
            isError = true;
            errors.nameError = "Username so long";
        }

        if (this.state.password.length < 6) {
            isError = true;
            errors.nameError = "Password needs to be atleast 6 characters long";
        }

        if (this.state.email.indexOf("@") === -1) {
            isError = true;
            errors.emailError = "Requires valid email";
        }

        if (isError) {
            this.setState({
                ...this.state,
                ...errors
            })
        }
        
        return isError;
    }

    onSubmit(event) {
        event.preventDefault()
        const err = this.validate();
        if (!err) {
            const newUser = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                password_confirm: this.state.password_confirm
            }
    
            Authentication.registerUser(newUser).then((res) => {
                this.props.history.push(`/login`)
            })
        }
    }

    render() {
        return (
            <div className="Register">
                <form onSubmit={this.onSubmit}>
                    <FormGroup bsSize="large">
                        <ControlLabel>Username</ControlLabel>
                        <FormControl
                            autoComplete="off"
                            id="name-input"
                            name="name"
                            className="center-block"
                            placeholder="Enter User Name"
                            autoFocus
                            type="text"
                            value={this.state.name}
                            onChange={this.onChange}
                            errorText={this.state.nameError}
                        />
                    </FormGroup>
                    <FormGroup bsSize="large">
                        <ControlLabel>Email Address</ControlLabel>
                        <FormControl
                            autoComplete="off"
                            id="email-input"
                            name="email"
                            className="center-block"
                            placeholder="Enter Email"
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={this.onChange}
                            errorText={this.state.emailError}
                        />
                    </FormGroup>
                    <FormGroup bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            autoComplete="off"
                            id="password-input"
                            name="password"
                            type="password"
                            className="center-block"
                            placeholder="Enter Password"
                            value={this.state.password}
                            onChange={this.onChange}
                            errorText={this.state.passwordError}
                        />
                    </FormGroup>
                    <FormGroup bsSize="large">
                        <ControlLabel>Password Confirm</ControlLabel>
                        <FormControl
                            autoComplete="off"
                            id="password-confirm-input"
                            name="password_confirm"
                            type="password"
                            className="center-block"
                            placeholder="Confirm Password"
                            value={this.state.password_confirm}
                            onChange={this.onChange}
                            errorText={this.state.password_confirmError}
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
