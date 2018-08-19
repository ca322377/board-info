import { SLOPE_INFO } from './types'
import { firestore } from '../config/firebase'

export const getDoc = (docId) => (dispatch) => {
  firestore.doc('slopes/' + docId).get()
    .then(doc => {
      if (doc.exists) {
        dispatch({
          type: SLOPE_INFO,
          payload: doc
        })
      }
    }).catch(err => console.log('Error getting document', err))
}