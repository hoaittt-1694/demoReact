import React, { Component } from "react"
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap"
import * as Authentication from '../../api/Authentication'

export default class ResendVerifyCode extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            errors: null
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
        const user = {
            email: this.state.email,
        }

        Authentication.resendVerifyCode(user).then((res) => {
            //check send success or fail, notify.
        })
    }

    render() {
        return (
            <div className="Login container">
                Please check mail or enter your email to resend active code.
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
