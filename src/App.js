import React, { Component } from 'react';
import { Provider } from 'react-redux'
import store from './store'
import Login from './components/Login'
import MainPage from './components/MainPage'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { fireauth } from './config/firebase'
var authListener

class App extends Component {
  state = {
    isLogin: false
  }

  componentDidMount() {
    authListener = fireauth.onAuthStateChanged(user => {
      console.log('authListener', user)
      if (user) {
        this.setState({ isLogin: true })
      } else {
        this.setState({ isLogin: false })
      }
    })
  }

  componentWillUnmount() {
    authListener()
  }

  render() {
    const { isLogin } = this.state
    console.log('isLogin', isLogin)

    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path='/login' component={Login} willRedirect={isLogin} />
            <PrivateRoute path='/' component={MainPage} isLogin={isLogin} />
          </div>
        </Router>
      </Provider>
    );
  }
}

const PrivateRoute = ({ component: Component, isLogin, ...rest }) => {
  console.log('PrivateRoute', isLogin)
  
  return (
  <Route exact {...rest} render={(props) => (
    isLogin ?
      <Component {...props} /> :
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
  )} />
)}

export default App;
