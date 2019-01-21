import React, { Component } from "react"
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap"
import * as Authentication from '../../api/Authentication'

export default class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: "",
            emailError: "",
            password: "",
            emailError: "",
            error: {}
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0
    }

    validate = () => {
        let isError = false
        const errors = {
            emailError: "",
            passwordError: "",
        };
        if (this.state.email.length > 255) {
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

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit(event) {
        event.preventDefault()
        const err = this.validate();
        if (!err) {
            const user = {
                email: this.state.email,
                password: this.state.password,
            }
            Authentication.loginUser(user).then((res) => {
                if (res) {
                    this.props.history.push(`/profile`)
                }
    
            })
        }
    }

    render() {
        return (
            <div className="Login container">
                <form onSubmit={this.onSubmit}>
                    <FormGroup controlId="email" bsSize="large">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            autoFocus
                            autoComplete="off"
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            value={this.state.email}
                            onChange={this.onChange}
                            errorText={this.state.emailError}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            autoFocus
                            autoComplete="off"
                            name="password"
                            type="password"
                            placeholder="Enter Password"
                            value={this.state.password}
                            onChange={this.onChange}
                            errorText={this.state.passwordError}
                        />
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
        )
    }
}
