import React, { Component } from 'react';
import TaskItem from './TaskItem';
import Moment from 'react-moment';
import { Button } from 'reactstrap';
import axios from "axios";

class TaskList extends Component {

    constructor(props) {

        super(props);

        this.state = {
            nameVal: '',
            dateComplVal: '',
            dateRemVal: '',
            listId: ''
        }

        this.addButton = this.addButton.bind(this);
        this.updateInputName = this.updateInputName.bind(this);
        this.updateDateCompl = this.updateDateCompl.bind(this);
        this.updateDateRem = this.updateDateRem.bind(this);

    }

    updateDateCompl(event) {
        this.setState({nameVal: event.target.value})
    }

    updateInputName(event) {
        this.setState({dateComplVal: event.target.value})
    }

    updateDateRem(event) {
        this.setState({dateRemVal: event.target.value})
    }


    addButton(event) {

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
                                Completed: <Moment parse="DD-MM-YYYY HH:mm">{item.dateCompletion}</Moment><br />
                                Reminder:  <Moment parse="DD-MM-YYYY HH:mm">{item.dateReminder}</Moment><br />
                                <input type="checkbox" /><br />
                                <hr />
                            </div>
                        </div>
                    )
                })}
                <label>Name</label> <input type="text" onChange={this.updateInputName} /><br />
                <label>Completed</label> <input type="text" placeholder="yyyy-mm-dd" onChange={this.updateDateCompl} /><br />
                <label>Reminder</label> <input type="text" placeholder="yyyy-mm-dd" onChange={this.updateDateRem} /><br />
                <Button onClick={this.addButton}>Add</Button>
            </div>
        )
    }

}

export default TaskList;