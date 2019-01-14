import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class Todo extends Component {
    render() {
        return (
            <div className="container">
                <div className="col-md-8 test"> TodoList</div>
            </div>  
        );
    }
}

if(document.getElementById('todo')) {
    ReactDOM.render(<Todo />, document.getElementById('todo'));
}