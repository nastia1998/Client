import React, { Component } from 'react';
import Moment from 'react-moment';
import { Button } from 'reactstrap';
import axios from "axios";
import DatePicker from "react-datepicker"

import DateTimePicker from 'react-datetime-picker';

import "../styles/TodoList.css"

import "react-datepicker/dist/react-datepicker.css";

import moment from 'moment';

class TaskList extends Component {

    constructor(props) {

        super(props);

        this.state = {
            nameVal: '',
            dateStart: '',
            dateEnd: '',
            listId: 0,
            taskId: 0,
            status: true,
            gmailPass: '',
            dateTest: new Date()
        };

        this.addButton = this.addButton.bind(this);
        this.sendToEmail = this.sendToEmail.bind(this);
    }

    updateDateCompl = date => {
        this.setState({dateStart: date}, () => console.log(this.state.dateStart, date))

    }

    updateDateRem = date => {
        this.setState({dateEnd: date}, () => console.log(1111111,this.state.dateEnd, date))
    }

    updateDateTest = date => {
        this.setState({dateTest: date}, () => console.log(255555, this.state.dateTest, date))
    }

    updateInputName = (event) => {
        this.setState({nameVal: event.target.value})
    }

    async addButton() {

        console.log('here',this.state.dateStart, this.state.dateEnd)

        const value = {
            todoListId: this.props.listId,
            name: this.state.nameVal,
            dateStart: this.state.dateStart,//moment(this.state.dateStart).format("YYYY-MM-d HH:mm:ss.0000000"),
            dateEnd: this.state.dateEnd
        }
        console.log('ffffffdasdfa', moment(this.state.dateStart).format("YYYY-MM-d HH:mm:ss.0000000"))
        console.log('hereeee', this.state.dateTest)

        console.log(value)


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

    async sendToEmail(event) {
        this.setState((prevState) => ({
            status: !prevState.status
        }));
        //if (this.state.status === false) {
            const { data } = await axios.get(`https://localhost:44390/api/todolists/${this.state.listId}/tasks/${event.target.id}`)
            console.log('ddd', data)
            const value = {
                emailFrom : localStorage.getItem('email'),
                password: this.state.gmailPass,
                emailTo: localStorage.getItem('email'),
                message: data.name,
                datestart: data.dateStart,
                dateend: data.dateEnd
            }
            console.log('value', value)
            console.log('vvvv', this.state.dateEnd)
            await axios.post("https://localhost:44390/api/email", value)
        //}


    }

    updatePassword = (event) => {
        this.setState({gmailPass: event.target.value})
    }

    componentDidMount() {
        this.setState({listId: this.props.listId})
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
                                Date Start: <Moment local format="D.MM.YYYY hh:mm">{item.dateStart}</Moment>
                                <Button id={item.id} color="danger" onClick={this.deleteItem}>X</Button>
                                <Button id={item.id} color="info" onClick={this.sendToEmail}>Send to Email</Button><br/>
                                {this.state.status ? <input type="text" onChange={this.updatePassword} /> : <input type="hidden" />}
                                Date End:  <Moment local format="D.MM.YYYY hh:mm">{item.dateEnd}</Moment><br />
                                <hr />
                            </div>
                        </div>
                    )
                })}
                <div className="container">
                    <label className="label">Name</label> <input className="input" type="text" onChange={this.updateInputName} />
                </div>
                <div className="container">
                    <label>Date Start</label> <DatePicker selected={this.state.dateStart}
                                                         onChange={this.updateDateCompl}
                                                         showTimeSelect timeFormat="HH:mm" timeIntervals={1} />
                </div>
                <div className="container">
                    <label>Date End</label> <DatePicker selected={this.state.dateEnd}
                                                        onChange={this.updateDateRem}
                                                        showTimeSelect timeFormat="HH:mm" timeIntervals={1} />
                </div>

                <Button onClick={this.addButton}>Add</Button>

            </div>
        )
    }

}

export default TaskList;