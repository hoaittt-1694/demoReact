import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import List from './List'
import Login from './form/Login'
import Register from "./form/Register"
import Navbar from "./layout/Navbar"
import Landing from "./layout/Landing"
import Profile from "./Profile"

class App extends Component {
    render() {
        return (
            <Router className="App">
                <div>
                    <Navbar />
                    <Route exact path="/" component={Landing}/>
                    <div className="container">
                        <Route exact path="/" component={ List } />
                        <Route exact path="/register" component={ Register } />
                        <Route exact path="/login" component={ Login } />
                        <Route exact path="/profile" component={ Profile } />
                    </div>
                </div>
            </Router>
        )
    }
}

export default App
