import React, { Component } from 'react';
import TaskItem from './TaskItem';
import Moment from 'react-moment';
import { Button } from 'reactstrap';
import axios from "axios";
import DatePicker from "react-datepicker";

import "../styles/TodoList.css"

import "react-datepicker/dist/react-datepicker.css";

class TaskList extends Component {
    state = {
        nameVal: '',
        dateComplVal: '',
        dateRemVal: '',
        listId: '',
    }

    updateDateCompl = data => {
        this.setState({dateComplVal: data}, () => console.log(this.state, data))

    }

    updateInputName = (event) => {
        this.setState({nameVal: event.target.value})
    }

    updateDateRem = (event) => {
        this.setState({dateRemVal: event.target.value})
    }


    addButton = (event) => {

        axios
            .post(`https://localhost:44390/api/todolists/${this.state.listId}/tasks`, {
                userId: 1,
                name: this.state.nameVal,
                description: this.state.descrVal
            })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })

    }

    componentDidMount() {
        this.setState({listId: this.props.listId})
    }

    render() {
        return(
            <div>
                {this.props.listId}<br />
                {this.props.tasks.map(item => {
                    return (
                        <div key={item.id}>
                            <div>
                                Name: {item.name}<br />
                                Completed: <Moment format="D.MM.YYYY hh:mm">{item.dateCompletion}</Moment><br />
                                Reminder:  <Moment format="D.MM.YYYY hh:mm">{item.dateReminder}</Moment><br />
                                <input type="checkbox" /><br />
                                <hr />
                            </div>
                        </div>
                    )
                })}
                <div className="container">
                    <label className="label">Name</label> <input className="input" type="text" onChange={this.updateInputName} /><br />
                </div>
                <div className="container">
                    <label>Completed</label> <DatePicker selected={this.state.dateComplVal} onChange={this.updateDateCompl}/><br />
                </div>
                <div className="container">
                    <label>Reminder</label> <DatePicker selected={this.state.dateRemVal} onChange={this.updateDateRem}/><br />
                </div>

                <Button onClick={this.addButton}>Add</Button>
            </div>
        )
    }

}

export default TaskList;