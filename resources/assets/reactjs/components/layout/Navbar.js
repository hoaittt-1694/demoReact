import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../../service/Auth';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
    }

    logOut(event) {
        event.preventDefault();
        Auth.deleteAuthenticateUser();
        this.props.history.push(`/login`);
    }

    render() {
        const loginRegLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link">
                        Login
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link">
                        Register
                    </Link>
                </li>
            </ul>
        );

        const userLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/home" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/profile" className="nav-link">
                        Profile
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/change-password" className="nav-link">
                        Change Password
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" onClick={this.logOut} className="nav-link">
                        Logout
                    </Link>
                </li>
            </ul>
        );

        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbar1"
                    aria-controls="navbar1"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggle-icon"></span>
                </button>

                <div id="navbar1" className="collapse navbar-collapse justify-content-md-right">
                    {Auth.isUserAuthenticated() ? userLink : loginRegLink}
                </div>
            </nav>
        )
    }
}

export default withRouter(Navbar);
