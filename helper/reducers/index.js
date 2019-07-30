import { combineReducers } from 'redux'
import {book} from './book'
import {library} from './library'

export default combineReducers({
  library: library
})