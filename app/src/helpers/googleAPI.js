//
// initialization functions - assumes gapi is loaded in window
//

export function initializeAuthDrive(configs, callback) {
  window.gapi.load('client:auth2', () => {
    window.gapi.client.init(configs).then(callback)
  })
}
