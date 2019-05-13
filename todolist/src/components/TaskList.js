import React, { Component } from 'react';
import Moment from 'react-moment';
import { Button } from 'reactstrap';
import axios from "axios";
import DatePicker from "react-datepicker";
import shortid from 'shortid';

import "../styles/TodoList.css"

import "react-datepicker/dist/react-datepicker.css";

class TaskList extends Component {

    constructor(props) {

        super(props);

        this.state = {
            nameVal: '',
            dateComplVal: '',
            dateRemVal: '',
            listId: '',
        };

        this.addButton = this.addButton.bind(this);
    }

    updateDateCompl = date => {
        this.setState({dateComplVal: date}, () => console.log(this.state, date))

    }

    updateDateRem = date => {
        this.setState({dateRemVal: date})
    }

    updateInputName = (event) => {
        this.setState({nameVal: event.target.value})
    }

    async addButton() {

        console.log('here',this.state.dateComplVal, this.state.dateRemVal)
        const value = {
            todoListId: this.state.listId,
            name: this.state.nameVal,
            dateCompletion: this.state.dateComplVal,
            dateReminder: this.state.dateRemVal
        }

        try {
            const { data } = axios
                .post(`https://localhost:44390/api/todolists/${this.state.listId}/tasks`, value)
                .then()

            this.props.addList(data)
        } catch (e) {
            console.log(e)
        }

    }

    componentDidMount() {
        this.setState({listId: this.props.listId})
    }

    render() {
        return(
            <div>
                {/*{this.props.listId}<br />*/}
                {console.log('rrrr', this.props.tasks.length)}
                {this.props.tasks.length && this.props.tasks.map(item => {
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
                    <label className="label">Name</label> <input className="input" type="text" onChange={this.updateInputName} />
                </div>
                <div className="container">
                    <label>Completed</label> <DatePicker selected={this.state.dateComplVal}
                                                         onChange={this.updateDateCompl}
                                                         showTimeSelect timeFormat="HH:mm" timeIntervals={1} />
                </div>
                <div className="container">
                    <label>Reminder</label> <DatePicker selected={this.state.dateRemVal}
                                                        onChange={this.updateDateRem}
                                                        showTimeSelect timeFormat="HH:mm" timeIntervals={1} />
                </div>

                <Button onClick={this.addButton}>Add</Button>

            </div>
        )
    }

}

export default TaskList;