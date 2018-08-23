import React, { Component } from 'react'
import Camera from './Camera'
import SlopeInfo from './SlopeInfo'
import Map from './Map'
import { fireauth } from '../config/firebase'

export default class MainPage extends Component {
  signOut() {
    fireauth.signOut()
  }

  render() {
    return (
      <div>
        <button onClick={this.signOut.bind(this)}> Sign out</button>
        <Camera /><br />
        <SlopeInfo /><br />
        <Map />
      </div>
    )
  }
}