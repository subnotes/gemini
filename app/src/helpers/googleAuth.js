//
// authentication functions - assume gapi is loaded in window and library is initialized
//

export function loginUser(callback) {
  window.gapi.auth2.getAuthInstance().signIn().then(callback);
}

export function logoutUser(callback) {
  window.gapi.auth2.getAuthInstance().signOut().then(callback);
}

export function setLogInOutHandler(logInOutHandler) {
  window.gapi.auth2.getAuthInstance().isSignedIn.listen(logInOutHandler);
}

export function isUserLoggedIn() {
  return window.gapi.auth2.getAuthInstance().isSignedIn.get()
}

export function getEmail() {
  return window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail()
}
