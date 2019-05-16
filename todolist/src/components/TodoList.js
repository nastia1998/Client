import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from "axios";

import TaskList from './TaskList';
import '../styles/TodoList.css'

import { Redirect } from 'react-router-dom';


class TodoList extends Component {

    state = {
        modal: false,
        listId: 0,
        taskList: [],
        nameVal: '',
        descrVal: '',
        todoList: []
    };

    async componentDidMount(){
        try {
            if(localStorage.getItem('userId') !== null) {
                const { data } = await axios.get(`https://localhost:44390/api/users/${localStorage.getItem('userId')}/todolists`, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`} });
                this.setState({todoList: data});
            }
        } catch (e) {
            localStorage.removeItem('token')
            localStorage.removeItem('userId')
        }

    }

    addTodoList = async(event) => {

        const value = {
            userId: localStorage.getItem('userId'),
            name: this.state.nameVal,
            description: this.state.descrVal
        }

        try {
            const { data } = await axios
                .post(`https://localhost:44390/api/users/${localStorage.getItem('userId')}/todolists`, value, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`} })

            this.setState(state => ({
                todoList: [...state.todoList, data]// записывает в массив все элементы текущего туду листа и в конец записываем новый туду лист
            }))

        } catch (e) {
            console.log(e)
        }
    }

    deleteTodoList = event => {
        this.setState({listId: event.target.id}, () => {
            axios
                .delete(`https://localhost:44390/api/users/${localStorage.getItem('userId')}/todolists/${this.state.listId}`, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`} })
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
        })

        this.updateTodoList(event.target.id)
    }

    updateTodoList = id => {
        const newTodoList = this.state.todoList.filter(item => item.id !== +id);

        this.setState({
            todoList: newTodoList
        })
    }


    openModal = listId => {

        this.setState((prevState) => ({
             modal: !prevState.modal
        }));

        if(!this.state.modal) {
            console.log('ggggggggggggg', listId)
            this.loadData(listId)
        }

    }

    loadData = async (listid) => {
       const {data} = await axios.get(`https://localhost:44390/api/todolists/${listid}/tasks`)
        this.setState({taskList: data, listId: listid})
    }

    updateInputName = event => {
        this.setState({nameVal: event.target.value})
    }

    updateInputDescr = event => {
        this.setState({descrVal: event.target.value})
    }

    addTaskList = data => {
        this.setState(state => ({
            taskList: [...state.taskList, data]
        }))
    }

    deleteTaskList = id => {
        const newTaskList = this.state.taskList.filter(item => item.id !== +id);

        this.setState({
            taskList: newTaskList
        })
    }

    render() {
        console.log('llll', this.state.listId, "ListID")
        return this.props.loggedIn ?
            (
            <div>
                <div className="lists">
                    { this.state.todoList.map(c =>
                        <p key={c.id}>
                            <Button onClick={() => this.openModal(c.id)}>
                                <div id={c.id} name={c.name}> {c.id} {c.name} {c.description} </div>
                            </Button>
                            <Button outline id={c.id} color="danger" onClick={this.deleteTodoList}> X </Button>
                        </p>
                        )
                    }
                    <Modal isOpen={this.state.modal} toggle={this.openModal} className={this.props.className} tasks={this.state.taskList}>
                        <ModalHeader toggle={this.openModal}>Tasks</ModalHeader>
                        <ModalBody>
                            <div>
                                <TaskList addList={this.addTaskList} deleteList={this.deleteTaskList} listId={this.state.listId} tasks={this.state.taskList} />
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" >Do Something</Button>{' '}
                            <Button color="secondary" >Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
                <hr />
                <div className="lists">
                    <label>Name</label> <input type="text" onChange={this.updateInputName} /><br />
                    <label>Description</label> <input type="text" onChange={this.updateInputDescr} /><br />
                    <Button outline color="primary" onClick={this.addTodoList}>Add</Button>
                </div>
            </div>
        ) : <Redirect to='/login'/> ;
    }
}

export default TodoList;