import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import firebaseConfig from './keys'

firebase.initializeApp(firebaseConfig)
const firestore = firebase.firestore()
const settings = {timestampsInSnapshots: true}
firestore.settings(settings)

export { firestore }

const fireauth = firebase.auth()
export { fireauth }