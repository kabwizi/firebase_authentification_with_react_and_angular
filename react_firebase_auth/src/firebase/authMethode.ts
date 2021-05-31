import app, { firebaseApp } from './firebase'

/*
here is all the functions use to
manage the user authentication states
*/

export async function signinUserWithEmailAndPassword(
  email: string,
  password: string
) {
  return app.auth().createUserWithEmailAndPassword(email, password)
}

export function loginUserWithEmailAndPassword(email: string, password: string) {
  return app.auth().signInWithEmailAndPassword(email, password)
}

export function getUserToken() {
  return app.auth().currentUser?.getIdToken()
}

export function logOut() {
  return app.auth().signOut()
}

export function sendResetPassword(email: string) {
  return app.auth().sendPasswordResetEmail(email)
}

export function signInWithGoogle() {
  var provider = new firebaseApp.auth.GoogleAuthProvider()
  return app.auth().signInWithPopup(provider)
}
