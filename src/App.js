import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux'
import store from './store'
import Posts from './components/Posts'
import AddPost from './components/AddPost'
import Image from './components/Image'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AddPost />
          <br />
          <Image />
          <br/>
          <Posts />
        </div>
      </Provider>
    );
  }
}

export default App;
