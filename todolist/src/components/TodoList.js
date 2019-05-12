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
            namelist: '',
            tasks: []
        };

        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        axios
            .get('https://localhost:44390/api/todolists/2/tasks')
            .then(response => {

                const newTasks = response.data.map(c => {
                    return {
                        id: c.id,
                        name: c.name,
                        description: c.description
                    };
                });

                const newState = Object.assign({}, this.state, {
                    tasks: newTasks
                });

                this.setState(newState);

            })
            .catch(error => console.log(error));
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {
        return (
            <div>
                <div>
                    { this.props.todolists.map(c =>
                        <Button key={c.id} onClick={this.toggle}>
                            <TodoItem name={c.name} description={c.description} />
                        </Button>
                        )
                    }
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>{this.state.namelist}</ModalHeader>
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