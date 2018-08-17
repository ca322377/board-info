import instascan from 'instascan'
var scanner

export const init = (video, cameraId, callback) => {
  scanner = new instascan.Scanner({
    video: video,
    backgroundScan: false,
    mirror: false
  })

  scanner.addListener('scan', callback)
  
  instascan.Camera.getCameras().then(cameras => {
    if (cameras.length > 0) {
      cameras.forEach(camera => {
        if (camera.id === cameraId) {
          scanner.start(camera)
        }
      })        
    } else {
      console.log('No cameras found')
    }
  }).catch(err => console.log(err))
}

export const stop = () => {
  return new Promise((resolve, reject) => {
    scanner.stop().then(resolve()).catch(err => reject(err))
  })
}