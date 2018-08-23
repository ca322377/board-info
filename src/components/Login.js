import React, { Component } from 'react'
import { fireauth } from '../config/firebase'
import { Redirect } from 'react-router-dom'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.email = React.createRef()
    this.password = React.createRef()
  }

  login = () => {
    fireauth.signInWithEmailAndPassword(this.email.current.value, this.password.current.value)
      .catch(e => console.log(e))
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    console.log('Login', from)
    if (this.props.willRedirect) return <Redirect to={from} />

    return (
      <div>
        <input ref={this.email} type="email" placeholder='Email' />
        <input ref={this.password} type="password" placeholder='Password' />
        <button onClick={this.login.bind(this)}>Log in</button>
      </div>
    )
  }
}