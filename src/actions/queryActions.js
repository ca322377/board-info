import { SLOPE_INFO } from './types'
import { firestore } from '../config/firebase'
import { showLoader } from './loadActions'

export const getDoc = (docId) => (dispatch) => {
  docId = docId.replace(/\/\//g, '')
  dispatch(showLoader(true)) 

  firestore.doc('slopes/' + docId).get()
    .then(doc => {
      if (doc.exists) {
        dispatch({
          type: SLOPE_INFO,
          payload: doc
        })
      }
      dispatch(showLoader(false))
    }).catch(err => console.log('Error getting document', err))
}