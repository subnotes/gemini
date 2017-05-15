//
// drive/notebook functions - assumes gapi is loaded in window, user is logged in, and library is initialized
//

// callback is passed 'response', notebook is in 'response.result'
export function downloadNotebook(notebookId, callback) {
  const path = 'https://www.googleapis.com/drive/v3/files/' + notebookId + '?alt=media';
  const method = 'GET';
  window.gapi.client.request({'path': path, 'method': method}).then(callback);
}

export function uploadNotebook(notebook, notebookId, callback) {
  const params = {
    "uploadType": "media"
  }
  const method = 'PATCH'
  const path = 'https://www.googleapis.com/upload/drive/v3/files/' + notebookId
  window.gapi.client.request({'path': path, 'method': method, 'body': notebook, 'params': params}).then(callback)
}

// callback is passed 'response', new notebook id is in 'response.result.id'
export function createNotebook(name, callback) {
  // need to check that files with name doesn't alread exist, or should that be done someplace else???
  const metaData = {
    "name": name,
    "mimeType": "application/json"
  }
  const method = 'POST'
  const path = 'https://www.googleapis.com/drive/v3/files'
  window.gapi.client.request({'path': path, 'method': method, 'body': metaData}).then(callback)
}

// callback is passed 'response', files are stored in 'response.result.files'
export function getSubnotes(callback) {
  const method = 'GET';
  const path = 'https://www.googleapis.com/drive/v3/files';
  window.gapi.client.request({'path': path, 'method': method}).then(callback);
}
