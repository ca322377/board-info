import React, { Component } from 'react'
import instascan from 'instascan'
var scanner

export default class Image extends Component {
  constructor(props) {
    super(props)
    this.video = React.createRef()
    this.videoSelect = React.createRef()
    this.state = {
      qrValue: ''
    }
    this.initInstascan = this.initInstascan.bind(this)
  }

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
      }
    })
  }

  getStream() {
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
  }

  render() {
    return (
      <div>
        <video autoPlay='true' ref={this.video}></video>
        <br />
        <div>
          {this.state.qrValue}
          <select ref={this.videoSelect} onChange={this.handleSelect.bind(this)}></select>
        </div>
      </div>
    )
  }
}