import { combineReducers } from 'redux'
import {library, vocabulary} from './library'

export default combineReducers({
  library: library,
  vocabulary: vocabulary
})