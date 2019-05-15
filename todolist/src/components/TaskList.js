import React, { Component } from 'react';
import Moment from 'react-moment';
import { Button } from 'reactstrap';
import axios from "axios";
import DatePicker from "react-datepicker";

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
            taskId: 0
        };

        this.addButton = this.addButton.bind(this);
    }

    updateDateCompl = date => {
        this.setState({dateComplVal: date}, () => console.log(this.state, date))

    }

    updateDateRem = date => {
        this.setState({dateRemVal: date}, () => console.log(1111111,this.state, date))
    }

    updateInputName = (event) => {
        this.setState({nameVal: event.target.value})
    }

    async addButton() {

        console.log('here',this.state.dateComplVal, this.state.dateRemVal)
        const value = {
            todoListId: this.props.listId,
            name: this.state.nameVal,
            dateCompletion: this.state.dateComplVal,
            dateReminder: this.state.dateRemVal
        }


        console.log(2222, this.props.listId)


        try {
            const { data } = await axios
                .post(`https://localhost:44390/api/todolists/${this.props.listId}/tasks`, value)

            this.props.addList(data)
        } catch (e) {
            console.log(e)
        }

    }

    deleteItem = event => {
        this.setState({taskId: event.target.id}, () => {
            axios
                .delete(`https://localhost:44390/api/todolists/${this.props.listId}/tasks/${this.state.taskId}`)
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
        })

        this.props.deleteList(event.target.id)
    }

    render() {

        console.log(this.props.listId, 213123123123, this.state.listId)

        return(
            <div>
                {/*{this.props.listId}<br />*/}
                {console.log('rrrr', this.props.tasks.length)}
                {this.props.tasks.length && this.props.tasks.map(item => {
                    return (
                        <div key={item.id}>
                            <div>
                                Name: {item.name}<br />
                                Completed: <Moment format="D.MM.YYYY hh:mm">{item.dateCompletion}</Moment>
                                <Button id={item.id} color="danger" onClick={this.deleteItem}>X</Button><br/>
                                Reminder:  <Moment format="D.MM.YYYY hh:mm">{item.dateReminder}</Moment><br />
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