import React, { Component } from 'react'
import Instascan from 'instascan'

export default class Image extends Component {
  constructor(props) {
    super(props)
    this.video = React.createRef()
    this.select = React.createRef()
    this.gotDevices = this.gotDevices.bind(this)
    this.getStream = this.getStream.bind(this)
    this.state = {
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/220px-QR_code_for_mobile_English_Wikipedia.svg.png',
      qrValue: ''
    }
  }

  handleClick(e) {
    if (navigator.mediaDevices.enumerateDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.enumerateDevices().then(devices => (
        devices.forEach(device => {
          if (device.kind === 'videoinput') {
            let option = document.createElement('option')
            option.value = device.deviceId
            option.text = device.label
            this.select.current.appendChild(option)
          }
        })
      )).then(() => {
        console.log(this.select.current.value)
        navigator.mediaDevices.getUserMedia({
          video: {deviceId: {exact: this.select.current.value}}
        }).then(stream => {
          this.video.current = stream
          console.log(this.video.current)
        })
      })
      .catch(err => (
        console.log(err)
      ))
    }
  }

  initInstascan() {

  }

  gotDevices(devices) {
    devices.forEach(device => {
      if (device.kind === 'videoinput') {
        let option = document.createElement('option')
        option.value = device.deviceId
        option.text = device.label
        this.select.current.appendChild(option)
      }
    })
  }

  getStream() {
    navigator.mediaDevices.getUserMedia({
      video: {deviceId: {exact: this.select.current}}
    }).then(stream => (
      this.video.current = stream
    ))
  }

  render() {
    return (
      <div>
        <video autoPlay='true' ref={this.video}></video>
        <br />
        <button onClick={this.handleClick.bind(this)}>Read QR Code</button>
        <br />
        <div>
          {this.state.qrValue}
          <select ref={this.select}></select>
        </div>
      </div>
    )
  }
}