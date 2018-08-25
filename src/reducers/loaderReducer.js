import { SHOW_LOADER, SHOW_ERROR } from '../actions/types'

const initialState = {
  loading: false,
  isError: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOADER:
      return {
        ...state,
        loading: action.payload
      }
    case SHOW_ERROR:
      return {
        ...state,
        isError: action.payload
      }
    default:
      return state
  }
}