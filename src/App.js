import React, { Component } from 'react';
import { Provider } from 'react-redux'
import store from './store'
import Camera from './components/Camera'
import SlopeInfo from './components/SlopeInfo'
import Map from './components/Map'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Camera />
          <br/>
          <SlopeInfo />
          <br/>
          <Map />
        </div>
      </Provider>
    );
  }
}

export default App;
