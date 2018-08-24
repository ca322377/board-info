import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import Login from './components/Login'
import MainPage from './components/MainPage'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { fireauth } from './config/firebase'
var authListener

class App extends Component {
  state = {
    isLogin: false,
    isLoading: true
  }

  componentDidMount() {
    authListener = fireauth.onAuthStateChanged(user => {
      console.log('authListener - user', user)
      if (user) {
        this.setState({
          isLogin: true,
          isLoading: false
        })
      } else {
        this.setState({
          isLogin: false,
          isLoading: false
        })
      }
    })
  }

  componentWillUnmount() {
    authListener()
  }

  render() {
    const { isLoading, isLogin } = this.state
    console.log('App.js render - isLogin', isLogin)
    console.log('App.js render - isLoading', isLoading)
    if (isLoading) return null

    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path='/login' render={(props) => (<Login willRedirect={isLogin} {...props} />)} />
            <PrivateRoute path='/' component={MainPage} isLogin={isLogin} />
            <PrivateRoute path='/test' component={Test} isLogin={isLogin} />
          </div>
        </Router>
      </Provider>
    )
  }
}

const Test = () => {
  console.log('Test ')
  return <h3>Test Page</h3>
}

const PrivateRoute = ({ component: Component, isLogin, ...rest }) => {
  
  return (
    <Route exact {...rest} render={(props) => {
      console.log('PrivateRoute - isLogin', isLogin)
      return (isLogin ?
        <Component {...props} /> :
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
    )}} />
  )
}

export default App
