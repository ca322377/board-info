import React, { Component } from 'react'
<<<<<<< HEAD
import Instascan from 'instascan'
=======
import instascan from 'instascan'
var scanner
>>>>>>> 44be40bc831a886dbaa79932311268ed02e1d585

export default class Image extends Component {
  constructor(props) {
    super(props)
    this.video = React.createRef()
<<<<<<< HEAD
    this.select = React.createRef()
    this.gotDevices = this.gotDevices.bind(this)
    this.getStream = this.getStream.bind(this)
=======
    this.videoSelect = React.createRef()
>>>>>>> 44be40bc831a886dbaa79932311268ed02e1d585
    this.state = {
      qrValue: ''
    }
    this.initInstascan = this.initInstascan.bind(this)
  }

<<<<<<< HEAD
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
          video: true
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
=======
  componentDidMount() {
    this.init()
  }

  init() {
    if (navigator.mediaDevices.enumerateDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.enumerateDevices()
        .then(this.gotDevices.bind(this))
        .then(this.getStream.bind(this))
        .catch(err => console.log(err))
    }
  }

  gotDevices(devices) {
    const videoSelect = this.videoSelect.current

    return devices.forEach(device => {
      if (device.kind === 'videoinput') {
        const option = document.createElement('option')
        option.value = device.deviceId
        option.text = device.label || 'camera ' + videoSelect.length + 1
        videoSelect.appendChild(option)
>>>>>>> 44be40bc831a886dbaa79932311268ed02e1d585
      }
    })
  }

  getStream() {
<<<<<<< HEAD
    navigator.mediaDevices.getUserMedia({
      video: {deviceId: {exact: this.select.current}}
    }).then(stream => (
      this.video.current = stream
    ))
=======
    const videoSelect = this.videoSelect.current
    const video = this.video.current

    navigator.mediaDevices.getUserMedia({
      video: { deviceId: { exact: videoSelect.value } }
    }).then(stream => {
      video.srcObject = stream
      this.initInstascan()
    }).catch(err => console.log(err))
  }

  handleSelect(e) {
    const video = this.video.current

    if (video.srcObject) {
      scanner.stop().then(() => {
        video.srcObject.getTracks().forEach(t => t.stop())
        this.getStream()
      })
    }
  }

  initInstascan() {
    scanner = new instascan.Scanner({
      video: this.video.current,
      backgroundScan: false
    })

    scanner.addListener('scan', content => {
      console.log(content)
    })
    
    instascan.Camera.getCameras().then(cameras => {
      if (cameras.length > 0) {
        cameras.forEach(camera => {
          if (camera.id === this.videoSelect.current.value) {
            scanner.start(camera)
          }
        })        
      } else {
        console.log('No cameras found')
      }
    }).catch(err => console.log(err))
>>>>>>> 44be40bc831a886dbaa79932311268ed02e1d585
  }

  render() {
    return (
      <div>
        <video autoPlay='true' ref={this.video}></video>
<<<<<<< HEAD
        <br />
        <button onClick={this.handleClick.bind(this)}>Read QR Code</button>
        <br />
        <div>
          {this.state.qrValue}
          <select ref={this.select}></select>
=======
        <br />
        <div>
          {this.state.qrValue}
          <select ref={this.videoSelect} onChange={this.handleSelect.bind(this)}></select>
>>>>>>> 44be40bc831a886dbaa79932311268ed02e1d585
        </div>
      </div>
    )
  }
}