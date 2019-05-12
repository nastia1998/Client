import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from "axios";

import TodoItem from './TodoItem';
import TaskList from './TaskList';

class TodoList extends Component {

    constructor(props) {

        super(props);

        this.state = {
            modal: false,
            listId: 0,
            namelist: '',
            tasks: []
        };

        this.toggle = this.toggle.bind(this);
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

    render() {
        return (
            <div>
                <div>
                    { this.props.todolists.map(c =>
                        <p key={c.id}>
                            <Button onClick={this.toggle}>
                                <div id={c.id} name={c.name}> {c.id} {c.name} {c.description} </div>
                            </Button>
                        </p>
                        )
                    }
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} tasks={this.state.tasks}>
                        <ModalHeader toggle={this.toggle}>Tasks</ModalHeader>
                        <ModalBody>
                            <div>
                                <TaskList tasks={this.state.tasks} />
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
                <hr />
                <div>
                    <Button outline color="primary">Add</Button><input type="text" /><input type="text" /><br />
                    <Button outline color="primary">Delete</Button>
                </div>
            </div>
        );
    }
}

export default TodoList;