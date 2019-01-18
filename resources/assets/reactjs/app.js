import './bootstrap'
import App from './components/App'
import Login from './components/form/Login'
import React from 'react'
import ReactDOM from 'react-dom'

if (document.getElementById('todoApp')) {
    ReactDOM.render(<App />, document.getElementById('todoApp'))
}

if (document.getElementById('loginForm')) {
    ReactDOM.render(<Login />, document.getElementById('loginForm'))
}
