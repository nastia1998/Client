import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import axios from 'axios';

import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register';
import TodoList from './components/TodoList';

class App extends Component{

    state = {
        todoList: []
    };

    async componentDidMount() {

        try {
            const { data } = await axios.get("https://localhost:44390/api/todolists");
            this.setState({todoList: data});
        } catch (e) {
            console.log(e)
            this.setState({error: e.message})
        }

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
                           render={(props) => <TodoList todolists={this.state.todoList} />} />
                </div>
            </Router>
        );
    }
}

export default App;