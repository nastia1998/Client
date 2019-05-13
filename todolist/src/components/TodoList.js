import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from "axios";

import TaskList from './TaskList';
import '../styles/TodoList.css'

class TodoList extends Component {

    constructor(props) {

        super(props);

        this.state = {
            modal: false,
            listId: 0,
            tasks: [],
            nameVal: '',
            descrVal: ''
        };

        this.toggle = this.toggle.bind(this);

        this.toggleButton = this.toggleButton.bind(this);
        this.updateInputName = this.updateInputName.bind(this);
        this.updateInputDescr = this.updateInputDescr.bind(this);

        this.deleteItem = this.deleteItem.bind(this);
    }

    async componentDidMount() {

        try {
            if (this.state.listId !== 0 && this.state.listId !== null && this.state.listId !== '') {
                const {data} = await axios.get(`https://localhost:44390/api/todolists/${this.state.listId}/tasks`)
                this.setState({tasks: data})
            }
        } catch (e) {
            console.log(e)
            this.setState({error: e.message})
        }

    }

    toggle(event) {

        this.setState({listId: event.target.id}, () => {
            console.log('ty', this.state.listId)
            this.componentDidMount()
        })

        this.setState((prevState) => ({
            modal: !prevState.modal
        }));

    }

    updateInputName(event) {
        this.setState({nameVal: event.target.value})
    }

    updateInputDescr(event) {
        this.setState({descrVal: event.target.value})
    }

    async toggleButton(event) {
        const value = {
            userId: 1,
            name: this.state.nameVal,
            description: this.state.descrVal
        }

        try {
            const { data } = await axios
                .post("https://localhost:44390/api/todolists", value)

            this.props.addList(data)
        } catch (e) {
            console.log(e)
        }
    }

    deleteItem(event) {
        this.setState({listId: event.target.id}, () => {
            axios
                .delete(`https://localhost:44390/api/todolists/${this.state.listId}`)
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
        return (
            <div>
                <div className="lists">
                    { this.props.todolists.map(c =>
                        <p key={c.id}>
                            <Button onClick={this.toggle}>
                                <div id={c.id} name={c.name}> {c.id} {c.name} {c.description} </div>
                            </Button>
                            <Button outline id={c.id} color="danger" onClick={this.deleteItem}> X </Button>
                        </p>
                        )
                    }
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} tasks={this.state.tasks}>
                        <ModalHeader toggle={this.toggle}>Tasks</ModalHeader>
                        <ModalBody>
                            <div>
                                <TaskList listId={this.state.listId} tasks={this.state.tasks} />
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
                <hr />
                <div className="lists">
                    <label>Name</label> <input type="text" onChange={this.updateInputName} /><br />
                    <label>Description</label> <input type="text" onChange={this.updateInputDescr} /><br />
                    <Button outline color="primary" onClick={this.toggleButton}>Add</Button>
                </div>
            </div>
        );
    }
}

export default TodoList;