import React, { Component } from 'react'
import Camera from './Camera'
import SlopeInfo from './SlopeInfo'
import Map from './Map'
import Header from './Header'

export default class MainPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <Camera /><br />
        <SlopeInfo /><br />
        <Map />
      </div>
    )
  }
}