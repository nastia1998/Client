import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import TodoItem from './components/TodoItem'


class App extends Component{

    state = {
        todoList: [],
        loading: false,
        error: ""
    };

    async componentDidMount() {
        try {
            this.setState({loading: true})
            const { data } = await axios.get("https://localhost:44390/api/todolists")

            this.setState({todoList: data, loading: false})
        } catch (e) {
            console.log(e)
            this.setState({error: e.message, loading: false})
        }
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>Welcome to our To do list</p>
                    {this.state.loading ? <div>Loading...</div> : null}
                    {this.state.error ? <div>{this.state.error}</div> : null}
                    {this.state.todoList.map(item => <TodoItem key={item.id} item={item}/>)}
                </header>
            </div>
        );
    }
}

export default App;
