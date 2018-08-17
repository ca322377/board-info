import React, { Component } from 'react'
import * as cameraHandler from '../helper/cameraHandler'

export default class Camera extends Component {
  constructor(props) {
    super(props)
    this.video = React.createRef()
    this.videoSelect = React.createRef()
    this.state = {
      qrValue: ''
    }
  }

  componentDidMount() {
    cameraHandler.init(
      this.video.current,
      this.videoSelect.current,
      this.onQrFound
    )
  }

  onQrFound(content) {
    console.log(content)
  }

  render() {
    return (
      <div>
        <video autoPlay='true' ref={this.video}></video>
        <br />
        <div>
          {this.state.qrValue}
          <select ref={this.videoSelect} onChange={() => cameraHandler.handleSelect()}></select>
        </div>
      </div>
    )
  }
}