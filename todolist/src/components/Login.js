import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import axios from "axios";

import { Redirect } from 'react-router-dom';

class Login extends Component {

    constructor(props) {

        super(props);

        this.state = {
            login: '',
            password: '',
            token: '',
            logged: false,
            error: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    async handleSubmit(e) {

        e.preventDefault();

        const body = {
            login: this.state.login,
            password: this.state.password
        }

        try {
            console.log(this.state.login, this.state.password)
            const { data } = await axios.post("https://localhost:44390/api/auth/authenticate", body);
            if (data.token) {
                console.log('datatoken')
                this.setState({logged: true}, () => {
                    localStorage.setItem('token', this.state.token)
                    localStorage.setItem('userId', data.id)
                    localStorage.setItem('email', data.email)
                })
                localStorage.setItem('token', data.token)
                console.log('toooo', localStorage.getItem('token'))
                localStorage.setItem('userId', data.id)
                console.log('useeee', localStorage.getItem('userId'))
                this.props.history.push("/todolists")
            } else {
                this.setState({error: true})
                alert('Did not authorize')
            }

        } catch (e) {
            console.log(e)
            alert(e.message)
        }

    }

    onChange = (e) => {

        switch(e.target.type) {
            case 'text':
                this.setState({login: e.target.value}, () => {
                    console.log(this.state.login)
                })

            case 'password':
                this.setState({password: e.target.value}, () => {
                    console.log(this.state.password)
                })
        }

    }

    render() {
        if (this.state.loggedIn) {
            return <Redirect to='/todolists' />
        }
        return  (
            <div>
                Login page
                <Container>
                    <Form method="post" onSubmit={this.handleSubmit}>
                        <FormGroup row>
                            <Label for="Login" sm={7}>Login</Label>
                            <Col sm={10}>
                                <Input type="text" name="login" id="Login" onChange={this.onChange} required />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="Password" sm={7}>Password</Label>
                            <Col sm={10}>
                                <Input type="password" name="Password" id="Password" onChange={this.onChange} required />
                            </Col>
                        </FormGroup>
                        <FormGroup check row>
                            <Col sm={{ size: 10, offset: 2 }}>
                                <Button>Sign In</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Container>
            </div>
        )
    }
}
export default Login;