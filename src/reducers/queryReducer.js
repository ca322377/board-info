import { SLOPE_INFO } from '../actions/types'

const initialState = {
  slopeId: '',
  slopeData: {}
}

export default (state = initialState, action) => {
  switch(action.type) {
    case SLOPE_INFO:
      return {
        ...state,
        slopeId: action.payload.id,
        slopeData: action.payload.data()
      }
    default:
      return state
  }
}