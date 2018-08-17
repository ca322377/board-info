import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux'
import store from './store'
import Posts from './components/Posts'
import AddPost from './components/AddPost'
import Camera from './components/Camera'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AddPost />
          <br />
          <Camera />
          <br/>
          <Posts />
        </div>
      </Provider>
    );
  }
}

export default App;
