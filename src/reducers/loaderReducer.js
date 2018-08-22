import { SHOW_LOADER } from '../actions/types'

const initialState = {
  loading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOADER:
      return {
        ...state,
        loading: action.payload
      }
    default:
      return state
  }
}