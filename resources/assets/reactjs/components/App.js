import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import List from './List'
import Login from './form/Login'
import Register from "./form/Register"
import Navbar from "./layout/Navbar"

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Navbar />
                    <div className="container">
                        <Route exact path="/" component={ List } />
                        <Route exact path="/register" component={ Register } />
                        <Route exact path="/login" component={ Login } />
                    </div>
                </div>
            </Router>
        )
    }
}

export default App
