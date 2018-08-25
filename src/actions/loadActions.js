import { SHOW_LOADER, SHOW_ERROR } from './types'

export const showLoader = (loaded) => (dispatch) => {
  dispatch({
    type: SHOW_LOADER,
    payload: loaded
  })
}

export const showError = (isError) => (dispatch) => {
  dispatch({
    type: SHOW_ERROR,
    payload: isError
  })
}