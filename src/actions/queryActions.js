import { SLOPE_INFO } from './types'
import { firestore } from '../config/firebase'
import { showLoader, showError } from './loadActions'

export const getDoc = (docId) => (dispatch) => {
  docId = docId.replace(/\//g, '')
  dispatch(showLoader(true)) 

  firestore.doc('slopes/' + docId).get()
    .then(doc => {
      if (doc.exists) {
        dispatch({
          type: SLOPE_INFO,
          payload: doc
        })
      } else {
        dispatch(showError(true))
        setTimeout(() => dispatch(showError(false)), 3000)
      }
      dispatch(showLoader(false))
    }).catch(err => console.log('Error getting document', err))
}