import React, { Component } from 'react'
import { fireauth } from '../config/firebase'
import { Redirect } from 'react-router-dom'
import { Form, FormGroup, FormControl, Col, Button, ControlLabel } from 'react-bootstrap'
import '../css/Login.css'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.email = React.createRef()
    this.password = React.createRef()
  }

  login = (e) => {
    e.preventDefault()
    fireauth.signInWithEmailAndPassword(this.email.value, this.password.value)
      .catch(e => console.log(e))
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    if (this.props.willRedirect) return <Redirect to={from} />

    return (
      <div className='div-container'>
        <Form horizontal className='form-container'>
          <FormGroup controlId="formHorizontalEmail" className='group-container'>
            <Col componentClass={ControlLabel} sm={3}>Email</Col>
            <Col sm={10}>
              <FormControl type="email" placeholder="Email" inputRef={input => this.email = input} />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={3}>Password</Col>
            <Col sm={10}>
              <FormControl type="password" placeholder="Password" inputRef={input => this.password = input} />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit" onClick={this.login.bind(this)}>Sign in</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
}