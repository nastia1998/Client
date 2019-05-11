import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
//import { browserHistory } from 'react-router';
import axios from 'axios';

import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register';
import TodoList from './components/TodoList';

class App extends Component{

    state = {
        todolists: []
    };

    componentDidMount() {
        axios
            .get('https://localhost:44390/api/todolists')
            .then(response => {

                const newTodoLists = response.data.map(c => {
                    return {
                        id: c.id,
                        name: c.name,
                        description: c.description
                    };
                });

                const newState = Object.assign({}, this.state, {
                    todolists: newTodoLists
                });

                this.setState(newState);

            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <Router>
                <div>
                    <NavBar />
                    <Route name='home' exact path='/' component={HomePage} />
                    <Route name='login' exact path='/login' component={Login} />
                    <Route name='register' exact path='/register' component={Register} />
                    <Route name='todolists'
                           exact path='/todolists'
                           render={(props) => <TodoList todolists={this.state.todolists} />} />
                </div>
            </Router>
        );
    }
}

export default App;