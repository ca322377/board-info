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
          return scanner.start(camera)
        }
      })        
    } else {
      return console.log('No cameras found')
    }
  }).catch(e => console.log(e))
}

export const stop = () => {
  return new Promise((resolve, reject) => {
    scanner.stop().then(() => resolve()).catch(e => reject(e))
  })
}