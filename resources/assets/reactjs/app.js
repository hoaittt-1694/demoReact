import './bootstrap'
import App from './components/App'
import React from 'react'
import ReactDOM from 'react-dom'

if (document.getElementById('todoApp')) {
    ReactDOM.render(<App />, document.getElementById('todoApp'))
}
