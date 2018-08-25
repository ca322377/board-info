import * as instascan from './instascan'
let video, cameras = [], callback, cameraIndex

export const init = (mVideo, mCallback) => {
  return new Promise((resolve, reject) => {
    if (navigator.mediaDevices.enumerateDevices && navigator.mediaDevices.getUserMedia) {
      video = mVideo
      callback = mCallback

      navigator.mediaDevices.enumerateDevices()
        .then(gotDevices)
        .then(getStream)
        .then(() => resolve())
    }
  }).catch(e => console.log(e))
}

const gotDevices = (devices) => {
  cameras = []
  
  return devices.forEach(device => {
    if (device.kind === 'videoinput') {
      const label = device.label || 'camera ' + cameras.length + 1
      cameras.push({
        label: label,
        deviceId: device.deviceId,
        isActive: false
      })
    }
  })
}

const getStream = (e) => {
  cameras.forEach(obj => obj.isActive = false)
  cameraIndex = e === undefined ? cameras.length - 1 : e
  const obj = cameras.length !== 0 ? cameras[cameraIndex] : {}
  obj.isActive = true
  const id = (obj || {}).deviceId

  navigator.mediaDevices.getUserMedia({
    video: { deviceId: { exact: id } }
  }).then(stream => {
    video.srcObject = stream
    instascan.init(video, id, callback)
  }).catch(e => console.log(e))
}

export const handleSelect = (e) => {
  return new Promise(resolve => {
    if (cameraIndex === e) return resolve()
    if (!video.srcObject) return resolve()

    instascan.stop().then(() => {
      video.srcObject.getTracks().forEach(t => t.stop())
      getStream(e)
    }).then(() => resolve())

  }).catch(e => console.log(e))
}

export const getCameras = () => (
  cameras
)

