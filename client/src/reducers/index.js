import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import profile from './profile'
import forum from './forum'
import image from './image'
import notifs from './notifs'

export default combineReducers({
  alert,
  auth,
  profile,
  forum,
  image,
  notifs
})
