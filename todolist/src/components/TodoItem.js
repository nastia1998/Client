import React, {Component} from 'react';
import axios from 'axios'

class TodoItem extends Component {
    state = {
        tasks: [],
        loading: false,
        error: ""
    }

    async componentDidMount() {
        try {
            this.setState({loading: true})

            const { data } = await axios.get("https://localhost:44390/api/tasks");

            const result = data.filter(item => this.props.item.id === item.todoListId)

            this.setState({tasks: result, loading: false})
        } catch (e) {
            console.log(e)
            this.setState({error: e.message, loading: false})
        }
    }

    render() {
        return (
            <div>
                <div>ID: {this.props.item.id}</div>
                <div>Name: {this.props.item.name}</div>
                <hr/>
                Tasks: {this.state.tasks.map(item => {
                    const date = new Date(item.dateCompletion)

                    console.log(date)
                    return (
                        <div key={item.id}>
                            <div>Completed: {item.dateCompletion}</div>
                            <div>Reminder: {item.dateReminder}</div>
                            <div>{item.name}</div>
                        </div>
            )})}
            </div>
        )
    }
}

export default TodoItem