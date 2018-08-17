import * as instascan from './instascan'
var video, videoSelect, callback

export const init = (video, videoSelectz, callback) => {
  if (navigator.mediaDevices.enumerateDevices && navigator.mediaDevices.getUserMedia) {
    video = this.video
    this.videoSelect = videoSelect
    callback = this.callback

    navigator.mediaDevices.enumerateDevices()
      .then(gotDevices)
      .then(getStream)
      .catch(err => console.log(err))
  }
}

const gotDevices = (devices) => {
  return devices.forEach(device => {
    if (device.kind === 'videoinput') {
      const option = document.createElement('option')
      option.value = device.deviceId
      option.text = device.label || 'camera ' + videoSelect.length + 1
      videoSelect.appendChild(option)
    }
  })
}

const getStream= () => {
  navigator.mediaDevices.getUserMedia({
    video: { deviceId: { exact: videoSelect.value } }
  }).then(stream => {
    videoSelect.srcObject = stream
    instascan.init(video, videoSelect.value, callback)
  }).catch(err => console.log(err))
}

export const handleSelect = (e) => {
  if (video.srcObject) {
    instascan.stop().then(() => {
      video.srcObject.getTracks().forEach(t => t.stop())
      getStream()
    })
  }
}

