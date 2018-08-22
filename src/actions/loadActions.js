import { SHOW_LOADER } from './types'

export const showLoader = (loaded) => (dispatch) => {
  dispatch({
    type: SHOW_LOADER,
    payload: loaded
  })
}