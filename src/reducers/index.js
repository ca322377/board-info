import { combineReducers } from 'redux'
import queryReducer from './queryReducer'
import loaderReducer from './loaderReducer'

export default combineReducers({
  slope: queryReducer,
  loader: loaderReducer
})