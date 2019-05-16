import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import axios from 'axios';

import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register';
import TodoList from './components/TodoList';

import { Redirect } from 'react-router-dom';

class App extends Component{

    state = {
        todoList: [],
        loggedIn: false,
        //todoListId: 0
    };

    async componentDidMount() {

        try {
            if(localStorage.getItem('userId') !== null) {
                const { data } = await axios.get(`https://localhost:44390/api/users/${localStorage.getItem('userId')}/todolists`, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`} });
                this.setState({todoList: data}, () => {
                    console.log('loggedin', this.state.loggedIn)
                    console.log('qwerty', data)
                });
            } else {
                //alert('You are not authorized!')
            }

        } catch (e) {
            console.log(e)
            localStorage.removeItem('token')
            localStorage.removeItem('userId')
            this.setState({error: e.message})
        }

    }

    addTodoList = data => {
        this.setState(state => ({
            todoList: [...state.todoList, data]// записывает в массив все элементы текущего туду листа и в конец записываем новый туду лист
        }))
    }

    deleteTodoList = id => {
        const newTodoList = this.state.todoList.filter(item => item.id !== +id);

        this.setState({
            todoList: newTodoList
        })
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
                           render={(props) => <TodoList addList={this.addTodoList} deleteList={this.deleteTodoList} todolists={this.state.todoList} loggedIn={!this.state.loggedIn}/>} />
                </div>
            </Router>
        )
    }
}

export default App;