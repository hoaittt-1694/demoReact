import React, { Component } from "react"
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap"
import * as Authentication from '../../api/Authentication'

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            error: ""
        }

        this.handlePassChange = this.handlePassChange.bind(this)
        this.handleUserChange = this.handleUserChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.dismissError = this.dismissError.bind(this)
    }

    dismissError() {
        this.setState({ error: '' })
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0
    }

    handleUserChange(event) {
        this.setState({
            email: event.target.value,
        });
    };

    handlePassChange(event) {
        this.setState({
            password: event.target.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault()
        const user = {
            email: this.state.email,
            password: this.state.password,
        }
        Authentication.loginUser(user).then((data) => {
            if (!data.error) {
                this.props.history.push("/");
                const AUTH_TOKEN = localStorage.getItem(data)
            } else {
                console.log(data.error)
                this.setState({
                    error: data
                })
            }

        })
    }

    render() {
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email" bsSize="large">
                        {
                            this.state.error &&
                            <h3 data-test="error" onClick={this.dismissError}>
                                <button onClick={this.dismissError}>✖</button>
                                {this.state.error}
                            </h3>
                        }
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={this.handleUserChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handlePassChange}
                            type="password"
                        />
                    </FormGroup>
                    <Button
                        className= "btn btn-success btn-block"
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
