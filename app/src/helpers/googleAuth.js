//
// authentication functions - assume gapi is loaded in window and library is initialized
//

export function loginUser(callback) {
  window.gapi.auth2.getAuthInstance().signIn().then(callback);
}

export function logoutUser(callback) {
  window.gapi.auth2.getAuthInstance().signOut().then(callback);
}

// getUserName () {}

export function setLogInOutHandler(logInOutHandler) {
  window.gapi.auth2.getAuthInstance().isSignedIn.listen(logInOutHandler);
}

export function isUserLoggedIn() {
  return window.gapi.auth2.getAuthInstance().isSignedIn.get()
}
