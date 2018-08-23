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
    if (!this.state.isLogin) return <Redirect to='/login' />

    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path='/login' render={() => (
              this.state.isLogin ? <Redirect to='/' /> : <Login />
            )} />
            <Route exact path='/' component={MainPage} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
